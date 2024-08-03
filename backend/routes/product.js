const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getShopProducts,
  uploadImages,
  getAdminProducts,
  updateProductBasic,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/shop/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/shop/uploadImages")
  .post(isAuthenticatedUser, authorizeRoles("admin"), uploadImages);

router
  .route("/shop/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router
  .route("/shop/product/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductBasic);

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/shop/products").get(getShopProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);

module.exports = router;
