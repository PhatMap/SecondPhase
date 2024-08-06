const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.uploadImages = catchAsyncErrors(async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const image = imagesLinks[0];

  res.status(201).json({
    success: true,
    image,
  });
});

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  const valueArray = JSON.parse(req.body.images);
  const variants = JSON.parse(req.body.variants);

  req.body.variants = variants;
  req.body.images = valueArray;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 9;
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort();

  let products = await apiFeatures.query;

  const productsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    products,
  });
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  const valueArray = JSON.parse(req.body.images);
  const variants = JSON.parse(req.body.variants);

  req.body.variants = variants;
  req.body.images = valueArray;

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  }
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    await Product.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product is deleted",
    });
  }
});

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});




exports.getReviewsInProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.query.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3; // Số lượng review mỗi trang
  const skip = (page - 1) * limit;

  if (!productId) {
    return next(new ErrorHandler('Product ID is required', 400));
  }

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const totalReviews = product.reviews.length;

  // Sắp xếp reviews (ví dụ: theo thời gian tạo giảm dần)
  const sortedReviews = product.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Thực hiện phân trang thủ công
  const paginatedReviews = sortedReviews.slice(skip, skip + limit);

  res.status(200).json({
    success: true,
    reviews: paginatedReviews,
    totalReviews,
    currentPage: page,
    totalPages: Math.ceil(totalReviews / limit)
  });
});


exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getShopProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query).sort();

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .filterAdminProducts()
    .sort();

  let products = await apiFeatures.query;

  const total = products.length;

  apiFeatures.adminPagination();

  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    total,
  });
});

exports.updateProductBasic = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  }
});




exports.getProductCategories = catchAsyncErrors(async (req, res, next) => {
  let productIds = req.body.productIds;
  productIds = [...new Set(productIds)];
  const products = await Product.find({ '_id': { $in: productIds } }).select('category');
  const uniqueCategories = [...new Set(products.map(product => product.category.toString()))];
  res.status(200).json({
      success: true,
      categories: uniqueCategories
  });
});


