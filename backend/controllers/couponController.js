const Coupon = require('../models/coupon');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");


exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { percentage, description, target, quantity, expiry } = req.body;

  // Lấy thông tin role và idCreator từ người dùng đang đăng nhập
  const { role, _id: creatorId } = req.user;

  // Tạo một đối tượng coupon mới
  const newCoupon = await Coupon.create({
    percentage,
    description,
    target,
    quantity,
    expiry,
    role,
    creatorId,
  });

  res.status(201).json({
    success: true,
    coupon: newCoupon,
  });
});


exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
  const { percentage, description, target, quantity, expiry } = req.body;
  const { couponId } = req.params;

  let coupon = await Coupon.findById(couponId);
  if (!coupon) {
      return next(new ErrorHandler('Mã Giảm Giá Không Tồn Tại', 404));
  }

  coupon.percentage = percentage !== undefined ? percentage : coupon.percentage;
  coupon.description = description !== undefined ? description : coupon.description;
  coupon.target = target !== undefined ? target : coupon.target;
  coupon.quantity = quantity !== undefined ? quantity : coupon.quantity;
  coupon.expiry = expiry !== undefined ? expiry : coupon.expiry;

  await coupon.save();

  res.status(200).json({
      success: true,
      coupon
  });
});


exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const { couponId } = req.params;

  // Find the coupon by ID
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
      return next(new ErrorHandler('Coupon not found', 404));
  }

  // Delete the coupon
  await Coupon.findByIdAndDelete(couponId);

  // Return success response
  res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully'
  });
});

exports.getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = Number(req.query.resPerPage) || 10;
  const currentPage = Number(req.query.page) || 1;
  const skip = resPerPage * (currentPage - 1);

  let query = Coupon.find();

  // Apply filters
  if (req.query.keyword) {
      query = query.or([
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { target: { $regex: req.query.keyword, $options: 'i' } }
      ]);
  }

  if (req.query.status && req.query.status !== 'all') {
      query = query.where('status').equals(req.query.status);
  }

  if (req.query.role && req.query.role !== 'all') {
      query = query.where('role').equals(req.query.role);
  }

  // Get total number of documents
  const totalCoupons = await Coupon.countDocuments(query);

  // Execute query with pagination
  const coupons = await query.skip(skip).limit(resPerPage);

  res.status(200).json({
      success: true,
      coupons,
      totalCoupons,
      resPerPage,
      currentPage
  });
});
exports.toggleStatus = catchAsyncErrors(async (req, res, next) => {
  const { couponId } = req.params;

  // Find the coupon by ID
  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    return next(new ErrorHandler('Coupon not found', 404));
  }

  // Toggle the status
  coupon.status = coupon.status === "active" ? "inactive" : "active";

  await coupon.save();

  res.status(200).json({
    success: true,
    status: coupon.status,
    message: `Coupon is now ${coupon.status}`,
  });
});


exports.getActiveCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find({ status: 'active' });

  if (!coupons) {
      return next(new ErrorHandler('No active coupons found', 404));
  }

  res.status(200).json({
      success: true,
      coupons
  });
});