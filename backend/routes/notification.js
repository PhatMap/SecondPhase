const express = require("express");
const {
  getNotifications,
  readNotifications,
  getMoreNotifications,
} = require("../controllers/notificationController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");

router
  .route("/notifications/me")
  .get(isAuthenticatedUser, getNotifications)
  .put(isAuthenticatedUser, readNotifications);

router.route("/notifications").get(isAuthenticatedUser, getMoreNotifications);

module.exports = router;
