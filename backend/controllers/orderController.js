const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const Cart = require("../models/cart");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    userName,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    userName,
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  for (const item of orderItems) {
    await updateStock(item.product, item.variant, item.size, item.quantity);
    await updateCart(req.user._id, item.product, item.variant, item.size);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

async function updateStock(id, variantId, size, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    console.error(`Product not found: ${id}`);
    return;
  }

  product.variants.forEach((variant) => {
    if (variant.id === variantId) {
      variant.inventory.forEach((value) => {
        if (value.size === size) {
          value.stock -= quantity;
          variant.totalStock -= quantity;
          product.totalStock -= quantity;
        }
      });
    }
  });

  await product.save({ validateBeforeSave: false });
}

async function updateCart(userId, productId, variantId, size) {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    console.error(`Cart not found for user: ${userId}`);
    return;
  }

  cart.cartItems = cart.cartItems.filter(
    (item) =>
      !(
        item.product.toString() === productId.toString() &&
        item.variant.toString() === variantId.toString() &&
        item.size === size
      )
  );

  await cart.save({ validateBeforeSave: false });
}

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const apiFeatures = new APIFeatures(Order.find(), req.query).sort();

  const orders = await apiFeatures.query;

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  order.orderStatus = req.body.status;
  order.deliverAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  for (const item of order.orderItems) {
    await updateStock(item.product, item.variant, item.size, -item.quantity);
  }

  await Order.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
  });
});
