const Coupon = require('../models/coupon');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");


exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { percentage, description, target, quantity, expiry } = req.body;

  // Lấy thông tin role và idCreator từ người dùng đang đăng nhập
  const { role, _id: idCreator } = req.user;

  // Tạo một đối tượng coupon mới
  const newCoupon = await Coupon.create({
    percentage,
    description,
    target,
    quantity,
    expiry,
    role,
    idCreator,
  });

  // Trả về phản hồi thành công
  res.status(201).json({
    success: true,
    coupon: newCoupon,
  });
});
