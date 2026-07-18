const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
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
  
  // Data Sanitization: Prevent NoSQL Injection
  // This removes any keys containing prohibited characters ($ or .)
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`[SECURITY ALERT] NoSQL Injection attempt blocked from IP: ${req.ip}. Malicious key: ${key}`);
    },
  }),

  // HTTP Parameter Pollution (HPP) Prevention
  // Prevents attackers from sending duplicate parameters (e.g. ?sort=asc&sort=desc)
  hpp(),

  // Custom logging for suspected hacking activity
  (req, res, next) => {
    const suspiciousPatterns = ['<script>', 'javascript:', 'UNION SELECT', 'exec('];
    const url = req.originalUrl.toLowerCase();
    
    for (const pattern of suspiciousPatterns) {
      if (url.includes(pattern.toLowerCase())) {
        console.error(`[SECURITY CRITICAL] Malicious payload detected and blocked! IP: ${req.ip}`);
        return res.status(403).json({ error: 'Access Denied: Malicious request detected by Anti-Hack Shield.' });
      }
    }
    next();
  }
];

module.exports = antiHackMiddleware;
