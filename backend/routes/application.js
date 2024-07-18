const express = require("express");
const router = express.Router();
const { newApplication } = require("../controllers/applicationController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router
  .route("/customer/application/new")
  .post(isAuthenticatedUser, newApplication);

module.exports = router;
