const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Application = require("../models/application");
const Notification = require("../models/notification");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");
const Shop = require("../models/shop");

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

const createShop = async (applicationId, ownerId, status) => {
  const statusMap = {
    approved: "active",
    rejected: "inactive",
  };

  const existingShop = await Shop.findOne({ applicationId });

  if (status === "rejected" && !existingShop) {
    return null;
  }

  return Shop.findOneAndUpdate(
    { applicationId },
    {
      $setOnInsert: { ownerId },
      $set: { status: statusMap[status] || status },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
};

const createNotification = async (status, userId) => {
  return Notification.create({
    message:
      status === "approved"
        ? "Đơn đăng ký của bạn đã được duyệt"
        : "Đơn đăng ký của bạn đã bị từ chối",
    type: status === "approved" ? "success" : "error",
    userId: userId.toString(),
    category: "system",
  });
};

exports.updateApplication = catchAsyncErrors(async (req, res, next) => {
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

  await createShop(application._id, application.userId, status);
  await createNotification(status, application.userId);

  if (io && userSockets.has(application.userId.toString())) {
    const socketId = userSockets.get(application.userId.toString());
    io.to(socketId).emit("newNotification");
  }

  res.status(200).json({
    success: true,
  });
});
