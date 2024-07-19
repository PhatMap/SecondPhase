const express = require("express");
const router = express.Router();
const {
  newApplication,
  getApplications,
} = require("../controllers/applicationController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router
  .route("/customer/application/new")
  .post(isAuthenticatedUser, newApplication);

router.route("/admin/applications").get(isAuthenticatedUser, getApplications);

module.exports = router;
