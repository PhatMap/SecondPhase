const express = require("express");
const {
  getNotifications,
  readNotifications,
} = require("../controllers/notificationController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");

router
  .route("/notifications/me")
  .get(isAuthenticatedUser, getNotifications)
  .put(isAuthenticatedUser, readNotifications);

module.exports = router;
