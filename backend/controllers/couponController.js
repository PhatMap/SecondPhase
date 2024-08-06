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
  const apiFeatures = new APIFeatures(Coupon.find(), req.query)
    .filterCoupon()
    .sort();

  let coupons = await apiFeatures.query;

  const totalCoupons = coupons.length;

  apiFeatures.pagination();

  coupons = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    coupons,
    totalCoupons,
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