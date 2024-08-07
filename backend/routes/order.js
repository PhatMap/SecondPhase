const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  checkOrderReview,
  getOrderStats,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order-stats").get(getOrderStats);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/orders/me/checkOrderReview")
  .post(isAuthenticatedUser, checkOrderReview);

router
  .route("/shop/orders")
  .get(isAuthenticatedUser, authorizeRoles("shopkeeper"), allOrders);

router
  .route("/shop/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("shopkeeper"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("shopkeeper"), deleteOrder);

module.exports = router;
