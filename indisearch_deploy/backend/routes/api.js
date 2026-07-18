const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


router.get('/search', searchController.performSearch);
router.get('/transliterate', searchController.transliterate);


router.get('/food', searchController.getSurplusFood);
router.post('/food/claim/:id', searchController.claimFood);

module.exports = router;
