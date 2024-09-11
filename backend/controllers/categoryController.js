const Category = require("../models/category");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { categoryName, vietnameseName, image } = req.body;

  if (image.public_id === "") {
    const result = await cloudinary.v2.uploader.upload(image.url, {
      folder: "categories",
      width: 150,
      crop: "scale",
    });
    image.public_id = result.public_id;
    image.url = result.secure_url;
  }

  const category = await Category.create({
    image,
    categoryName,
    vietnameseName,
  });

  res.status(201).json({
    success: true,
    category,
  });
});
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Category.find(), req.query)
    .filterCategory()
    .sort();

  let categories = await apiFeatures.query;

  const totalCategories = categories.length;

  apiFeatures.adminPagination();

  categories = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    categories,
    totalCategories,
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.params;
  const { categoryName, vietnameseName, image } = req.body;

  let category = await Category.findById(categoryId);

  if (!category) {
    return next(new ErrorHandler("Danh mục không tồn tại", 404));
  }

  category.image = image;
  category.categoryName = categoryName;
  category.vietnameseName = vietnameseName;

  await category.save();

  res.status(200).json({
    success: true,
  });
});

// Xóa danh mục và tất cả sản phẩm có cùng danh mục đó
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const { categoryId } = req.params;

  // Tìm danh mục cần xóa
  let category = await Category.findById(categoryId);

  if (!category) {
    return next(new ErrorHandler("Danh mục không tồn tại", 404));
  }

  // Xóa tất cả sản phẩm có cùng danh mục
  const deleteResult = await Product.deleteMany({ category: categoryId });

  // Xóa danh mục
  await Category.findByIdAndDelete(categoryId);

  res.status(200).json({
    success: true,
    message: `Đã xóa danh mục ${category.categoryName} và ${deleteResult.deletedCount} sản phẩm liên quan`,
  });
});
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});

exports.getCategoryAll = async (req, res, next) => {
  try {
    const AllCategories = await Category.find();
    res.status(200).json({
      success: true,
      data: AllCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
