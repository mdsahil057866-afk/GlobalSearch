const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = 'public/uploads/videos';
const thumbDir = 'public/uploads/videos/thumbnails';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail') {
      cb(null, thumbDir);
    } else {
      cb(null, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const mockAuth = (req, res, next) => {
  req.user = { id: req.headers['x-user-id'] || 'default_user_id' }; 
  next();
};

router.use(mockAuth);

router.get('/', videoController.getAllVideos);
router.post('/upload', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), videoController.uploadVideo);
router.get('/stream/:id', videoController.streamVideo);

module.exports = router;
