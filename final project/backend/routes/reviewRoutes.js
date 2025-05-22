const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');

router.post('/api/reviews', reviewController.addReview);
router.get('/api/reviews', reviewController.getReviews);

module.exports = router;