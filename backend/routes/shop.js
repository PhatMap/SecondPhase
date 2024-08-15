const express = require("express");
const { uploadImages, updateShop } = require("../controllers/shopController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

router
  .route("/shop/section/upload/images")
  .post(isAuthenticatedUser, authorizeRoles("shopkeeper"), uploadImages);

router
  .route("/shop/me")
  .put(isAuthenticatedUser, authorizeRoles("shopkeeper"), updateShop);

module.exports = router;
