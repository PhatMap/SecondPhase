const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const Shop = require("../models/shop");
const Application = require("../models/application");
const Product = require("../models/product");
const { statsRecord } = require("../utils/statsHandler");

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

  res.status(201).json({
    success: true,
    image,
  });
});

exports.updateShop = catchAsyncErrors(async (req, res, next) => {
  const { newData, field } = req.body;
  let updateData = {};

  switch (field) {
    case "avatar":
      const result = await cloudinary.v2.uploader.upload(newData.url, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      updateData = {
        [field]: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      };
      break;
    case "sections":
      updateData = { $push: { sections: newData } };
      break;
    default:
      updateData = { [field]: newData };
  }

  await Shop.findOneAndUpdate({ ownerId: req.user.id }, updateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getShop = catchAsyncErrors(async (req, res, next) => {
  let shop = await Shop.findOne({ ownerId: req.user.id });

  for (let section of shop.sections) {
    const products = await Product.find({
      shopId: shop._id,
      category: section.categoryId,
    })
      .limit(5)
      .lean();
    section.products = products;
  }

  shop.save();

  const shopData = await Application.findOne({ userId: req.user.id });

  const stats = await statsRecord(shop._id, "shopkeeper");

  res.status(200).json({
    success: true,
    shop,
    shopData,
  });
});

exports.updateShopSection = catchAsyncErrors(async (req, res, next) => {
  const { newData, index } = req.body;

  await Shop.findOneAndUpdate(
    { ownerId: req.user.id },
    { $set: { [`sections.${index}`]: newData } },
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

exports.deleteShopSection = catchAsyncErrors(async (req, res, next) => {
  const { index } = req.body;

  const shop = await Shop.findOne({ ownerId: req.user.id });

  shop.sections.splice(index, 1);

  await shop.save();

  res.status(200).json({
    success: true,
  });
});
