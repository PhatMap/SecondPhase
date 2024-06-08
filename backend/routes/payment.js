const express = require("express");
const router = express.Router();

const {
  processPayment,
  sendStripeApi,
  momoPayment,
  momoCallback,
  momoCheckStatus,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(isAuthenticatedUser, sendStripeApi);

// router.route("/momo").post(isAuthenticatedUser, momoPayment);
// router.route("/momoCallback").post(momoCallback);
// router.route("/momoCheckStatus").post(isAuthenticatedUser, momoCheckStatus);

router.route("/momo").post(momoPayment);
router.route("/momoCallback").post(momoCallback);
router.route("/momoCheckStatus").post(momoCheckStatus);

module.exports = router;
