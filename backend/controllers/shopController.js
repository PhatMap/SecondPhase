const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const Shop = require("../models/shop");
const Application = require("../models/application");

exports.uploadImages = catchAsyncErrors(async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "test",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  const image = imagesLinks[0];

  console.log("Uploading image to cloudinary: ");

  res.status(201).json({
    success: true,
    image,
  });
});

exports.updateShop = catchAsyncErrors(async (req, res, next) => {
  const { newData, field } = req.body;

  await Shop.findOneAndUpdate(
    { ownerId: req.user.id },
    { [field]: newData },
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

exports.getShop = catchAsyncErrors(async (req, res, next) => {
  const shop = await Shop.findOne({ ownerId: req.user.id });

  const shopData = await Application.findOne({ userId: req.user.id });

  res.status(200).json({
    success: true,
    shop,
    shopData,
  });
});
