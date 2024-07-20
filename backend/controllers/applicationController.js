const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Application = require("../models/application");
const cloudinary = require("cloudinary");
const user = require("../models/user");
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

  applicationFromData.user_id = req.user.id;

  applicationFromData.identificationInfor.idCardImage = {
    public_id: idCardImage.public_id,
    url: idCardImage.secure_url,
  };

  applicationFromData.identificationInfor.selfieWithId = {
    public_id: selfieWithId.public_id,
    url: selfieWithId.secure_url,
  };

  // const final = {
  //   user_id: req.user.id,
  //   shopInfor: {
  //     shopName: applicationFromData.shopInfor.shopName,
  //     email: applicationFromData.shopInfor.email,
  //     phoneNumber: applicationFromData.shopInfor.phoneNumber,
  //     pickupAddress: {
  //       fullName: applicationFromData.shopInfor.pickupAddress.fullName,
  //       phoneNumber: applicationFromData.shopInfor.pickupAddress.phoneNumber,
  //       address: {
  //         province:
  //           applicationFromData.shopInfor.pickupAddress.address.province,
  //         district:
  //           applicationFromData.shopInfor.pickupAddress.address.district,
  //         ward: applicationFromData.shopInfor.pickupAddress.address.ward,
  //         detailed:
  //           applicationFromData.shopInfor.pickupAddress.address.detailed,
  //       },
  //     },
  //   },
  //   shippingMethod: applicationFromData.shippingMethod,
  //   taxInfor: {
  //     taxCode: applicationFromData.taxInfor.taxCode,
  //     billingEmail: applicationFromData.taxInfor.billingEmail,
  //     businessAddress: {
  //       province: applicationFromData.taxInfor.businessAddress.province,
  //       district: applicationFromData.taxInfor.businessAddress.district,
  //       ward: applicationFromData.taxInfor.businessAddress.ward,
  //       detailed: applicationFromData.taxInfor.businessAddress.detailed,
  //     },
  //   },
  //   identificationInfor: applicationFromData.identificationInfor,
  // };

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
