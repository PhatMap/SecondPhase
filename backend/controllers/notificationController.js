const Notification = require("../models/notification");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.getNotifications = catchAsyncErrors(async (req, res, next) => {
  const latest = await Notification.find({
    userId: req.user.id,
    isRead: false,
  }).sort();

  const recent = await Notification.find({
    userId: req.user.id,
    isRead: true,
  })
    .sort()
    .limit(5);

  res.status(200).json({
    success: true,
    latest,
    recent,
  });
});

exports.readNotifications = catchAsyncErrors(async (req, res, next) => {
  await Notification.updateMany(
    {
      userId: req.user.id,
      isRead: false,
    },
    {
      $set: { isRead: true },
    }
  );

  res.status(200).json({
    success: true,
  });
});
