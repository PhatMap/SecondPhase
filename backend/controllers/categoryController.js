const Category = require("../models/category");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/product");

// Upload ảnh cho danh mục
exports.uploadCategoryImages = catchAsyncErrors(async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  res.status(201).json({
    success: true,
    images: imagesLinks,
  });
});

// Tạo mới danh mục
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, images } = req.body;

  let imagesLinks = [];

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "categories",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  const category = await Category.create({
    name,
    images: imagesLinks,
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// Lấy tất cả danh mục
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, image } = req.body;

    // Tìm danh mục cần sửa
    let category = await Category.findById(categoryId);

    if (!category) {
        return next(new ErrorHandler("Danh mục không tồn tại", 404));
    }

    // Lấy tên cũ của danh mục trước khi cập nhật
    let oldCategoryName = category.name; // Đã thêm let ở đây để khai báo biến oldCategoryName

    // Cập nhật thông tin mới của danh mục
    category.name = name;
    category.image = image; // Cập nhật ảnh mới nếu có
    await category.save();

    // Tìm và cập nhật tất cả sản phẩm có danh mục cũ sang danh mục mới
    const updateResult = await Product.updateMany(
        { category: oldCategoryName }, // Tìm các sản phẩm có danh mục cũ
        { $set: { category: name } } // Cập nhật danh mục mới
    );

    // Kiểm tra kết quả updateMany
    console.log(`Đã cập nhật ${updateResult.nModified} sản phẩm`);

    res.status(200).json({
        success: true,
        category,
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
    const deleteResult = await Product.deleteMany({ category: category.name });

    // Xóa danh mục
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
        success: true,
        message: `Đã xóa danh mục ${category.name} và ${deleteResult.deletedCount} sản phẩm liên quan`,
    });
});