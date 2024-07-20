const express = require("express");
const router = express.Router();
const { createCategory, 
    getAllCategories ,
    updateCategory,
    deleteCategory,
    getCategoryById

} = require("../controllers/categoryController");

// Định tuyến để tạo danh mục mới
router.route("/admin/category/new").post(createCategory);


router.route("/admin/categories").get(getAllCategories);
router.route("/admin/category/update/:categoryId").put(updateCategory);
router.route("/admin/category/delete/:categoryId").delete( deleteCategory);
router.route("/admin/category/:id").get(getCategoryById);
module.exports = router;
