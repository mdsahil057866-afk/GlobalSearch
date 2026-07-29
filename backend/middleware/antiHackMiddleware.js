const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// 1. Rate Limiting: Prevent DDoS and Brute-Force Attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per `window` (here, per 15 minutes)
  message: {
    status: 429,
    error: 'Too many requests from this IP. You have been temporarily blocked by GlobalNet Anti-Hack Shield.'
  },
  standardHeaders: true, 
  legacyHeaders: false, 
  // Custom handler for logging hacking attempts
  handler: (req, res, next, options) => {
    console.warn(`[SECURITY ALERT] Rate limit exceeded by IP: ${req.ip || req.connection.remoteAddress}`);
    res.status(options.statusCode).send(options.message);
  }
});

// 2. Export a middleware array that includes all security measures
const antiHackMiddleware = [
  // Apply rate limiter
  apiLimiter,

  // HTTP Parameter Pollution (HPP) Prevention
  // Prevents attackers from sending duplicate parameters (e.g. ?sort=asc&sort=desc)
  hpp(),

  // Custom logging and blocking for suspected hacking activity and third-party links
  (req, res, next) => {
    // Basic malicious patterns
    const suspiciousPatterns = ['<script>', 'javascript:', 'UNION SELECT', 'exec('];
    // Link patterns to block any third-party links
    const linkPatterns = ['http://', 'https://', 'www.'];
    
    const allPatterns = [...suspiciousPatterns, ...linkPatterns];
    
    // Function to recursively check object for patterns
    const hasPattern = (obj) => {
      if (typeof obj === 'string') {
        const str = obj.toLowerCase();
        return allPatterns.some(pattern => str.includes(pattern));
      } else if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some(val => hasPattern(val));
      }
      return false;
    };

    // Check URL, Query, and Body for any malicious patterns or links
    const url = decodeURIComponent(req.originalUrl || '');
    if (hasPattern(url) || hasPattern(req.query) || hasPattern(req.body)) {
      console.error(`[SECURITY CRITICAL] Malicious payload or third-party link detected and blocked! IP: ${req.ip}`);
      return res.status(403).json({ error: 'Access Denied: Third-party link or hack attempt blocked by Anti-Hack Shield.' });
    }
    
    next();
  }
];

module.exports = antiHackMiddleware;
