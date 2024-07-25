const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Application = require("../models/application");
const Notification = require("../models/notification");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");

exports.newApplication = catchAsyncErrors(async (req, res, next) => {
  const { formData } = req.body;

  const applicationFromData = JSON.parse(formData);

  const idCardImage = await cloudinary.v2.uploader.upload(
    applicationFromData.identificationInfor.idCardImage.url,
    {
      folder: "applications",
      width: 150,
      height: 100,
      crop: "scale",
    }
  );

  const selfieWithId = await cloudinary.v2.uploader.upload(
    applicationFromData.identificationInfor.selfieWithId.url,
    {
      folder: "applications",
      width: 150,
      height: 100,
      crop: "scale",
    }
  );

  applicationFromData.userId = req.user.id;

  applicationFromData.identificationInfor.idCardImage = {
    public_id: idCardImage.public_id,
    url: idCardImage.secure_url,
  };

  applicationFromData.identificationInfor.selfieWithId = {
    public_id: selfieWithId.public_id,
    url: selfieWithId.secure_url,
  };

  await Application.create(applicationFromData);

  res.status(200).json({
    success: true,
  });
});

exports.getApplications = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Application.find(), req.query)
    .filterApplication()
    .sort();

  let applications = await apiFeatures.query;

  const applicationCount = applications.length;

  apiFeatures.adminPagination();

  applications = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    applications,
    total: applicationCount,
  });
});

let io, userSockets;

exports.setIo = (_io, _userSockets) => {
  io = _io;
  userSockets = _userSockets;
};

exports.updateApplication = catchAsyncErrors(async (req, res, next) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: status },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    await Notification.create({
      message:
        status === "approved"
          ? "Đơn đăng ký của bạn đã được duyệt"
          : "Đơn đăng ký của bạn đã bị từ chối",
      type: status === "approved" ? "success" : "error",
      userId: application.userId.toString(),
      category: "system",
    });

    if (io && userSockets.has(application.userId.toString())) {
      const socketId = userSockets.get(application.userId.toString());

      const latestNotifications = await Notification.find({
        userId: application.userId,
        isRead: false,
      }).sort();

      io.to(socketId).emit("newNotification", latestNotifications);
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});
