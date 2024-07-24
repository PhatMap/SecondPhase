const express = require('express');
const router = express.Router();
const { createCoupon } = require('../controllers/couponController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route("/coupon/create").post(isAuthenticatedUser,createCoupon);
module.exports = router;