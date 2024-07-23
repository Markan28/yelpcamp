const express = require('express');
const router = express.Router({ mergeParams: true });
// mergeParams : true de naal aapan nu id da access miljaega
// Otherwise niche .post vich keh reha c ki cannot read property reviews bcz id NULL aari c
// It was not a problem in campgrounds.js bcz :id was included in all the paths
// But here we have include :id in the prefix
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;