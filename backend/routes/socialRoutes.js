const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); 
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


router.put('/profile', upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), socialController.updateProfile);


router.get('/feed', socialController.getFeed);
router.post('/post', upload.single('media'), socialController.createPost);
router.post('/post/:id/like', socialController.likePost);
router.post('/post/:id/comment', socialController.addComment);


router.post('/request', socialController.sendFriendRequest);
router.post('/accept', socialController.acceptFriendRequest);


router.get('/contacts', socialController.getContacts);
router.post('/contacts/add', socialController.addContact);
router.get('/messages/:userId', socialController.getMessages);
router.post('/messages', socialController.sendMessage);

module.exports = router;
