const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// In-memory stores for demonstration purposes. 
// In production, use Redis or MongoDB for OTPs and QR Sessions.
const otpStore = new Map(); // phone -> { otp, expiresAt }
const qrSessionStore = new Map(); // sessionId -> { status, userId }

const JWT_SECRET = process.env.JWT_SECRET || 'quickchat_super_secret_key_2026';

exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5 minutes expiration
    otpStore.set(phone, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
    });

    // SIMULATED SMS GATEWAY
    // If you add Twilio or Fast2SMS, put the API call here.
    console.log(`\n========================================`);
    console.log(`📱 SMS GATEWAY (SIMULATED)`);
    console.log(`To: ${phone}`);
    console.log(`Message: Your QuickChat verification code is: ${otp}`);
    console.log(`========================================\n`);

    res.json({ success: true, message: 'OTP sent successfully (Check server console)' });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    const record = otpStore.get(phone);
    if (!record) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP is valid. 
    otpStore.delete(phone);

    // Create a dummy user ID based on phone or find in DB (skipped DB check for demo)
    const userId = `user_${phone}`;
    const token = jwt.sign({ id: userId, phone }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, userId });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

exports.generateQrSession = async (req, res) => {
  try {
    // Generate a unique session ID (UUID)
    const sessionId = crypto.randomUUID();
    
    qrSessionStore.set(sessionId, {
      status: 'pending',
      userId: null,
      expiresAt: Date.now() + 2 * 60 * 1000 // 2 minutes expiry for QR
    });

    res.json({ success: true, sessionId });
  } catch (error) {
    console.error('Generate QR Error:', error);
    res.status(500).json({ error: 'Failed to generate QR session' });
  }
};

exports.scanQr = async (req, res) => {
  try {
    const { sessionId, userId } = req.body; // mobile app sends sessionId and its own auth token/userId
    
    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    const record = qrSessionStore.get(sessionId);
    if (!record) {
      return res.status(404).json({ error: 'QR Session not found or expired' });
    }

    if (Date.now() > record.expiresAt) {
      qrSessionStore.delete(sessionId);
      return res.status(400).json({ error: 'QR Session has expired' });
    }

    // Update session status
    const authenticatedUserId = userId || 'mock_qr_user_123';
    qrSessionStore.set(sessionId, {
      ...record,
      status: 'authenticated',
      userId: authenticatedUserId
    });

    // Emit socket event to the specific QR session room
    if (req.io) {
      req.io.to(`qr_${sessionId}`).emit('qr_authenticated', { 
        success: true, 
        userId: authenticatedUserId,
        token: jwt.sign({ id: authenticatedUserId }, JWT_SECRET, { expiresIn: '7d' })
      });
    }

    res.json({ success: true, message: 'QR Scanned and authenticated successfully' });
  } catch (error) {
    console.error('Scan QR Error:', error);
    res.status(500).json({ error: 'Failed to process QR scan' });
  }
};
