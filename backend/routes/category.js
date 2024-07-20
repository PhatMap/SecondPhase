const express = require("express");
const router = express.Router();
const { 
  createCategory, 
  getAllCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.route("/admin/category/new").post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);
router.route("/admin/categories").get(getAllCategories)
router.route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);
module.exports = router;
