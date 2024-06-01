const express = require("express");
const router = express.Router();

const {
  addToCart,
  getUserCart,
  removeProductFromCart,
  emptyTheCart,
  updateCartQuantity,
  getUserCartProduct,
} = require("../controllers/cartController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/cart").post(isAuthenticatedUser, addToCart);

router.route("/cart/me").get(isAuthenticatedUser, getUserCart);

router.route("/cart/product").post(isAuthenticatedUser, getUserCartProduct);

router
  .route("/cart/:id/:variant/:size")
  .delete(isAuthenticatedUser, removeProductFromCart);

router.route("/cart/empty").put(isAuthenticatedUser, emptyTheCart);

router.route("/cart/quantity").put(isAuthenticatedUser, updateCartQuantity);

module.exports = router;
