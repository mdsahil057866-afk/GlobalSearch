const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// OTP Routes
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);

// QR Code Routes
router.get('/qr/generate', authController.generateQrSession);
router.post('/qr/scan', authController.scanQr);

module.exports = router;
