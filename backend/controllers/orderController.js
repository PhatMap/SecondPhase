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
  let totalPaidAmount = 0;
  let totalPendingAmount = 0;

  orders.forEach((order) => {
    if (order.orderStatus === "canceled") {
      return;
    }
    totalAmount += order.totalPrice;

    if (order.paymentInfo && order.paymentInfo.status === "succeeded") {
      totalPaidAmount += order.totalPrice;
    } else {
      totalPendingAmount += order.totalPrice;
    }
  });

  res.status(200).json({
    success: true,
    totalAmount,
    totalPaidAmount,
    totalPendingAmount,
    orders,
  });
});

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (req.body.status === "canceled") {
    for (const item of order.orderItems) {
      await cancelorder(item.product, item.variant, item.size, item.quantity);
    }
  }

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  order.orderStatus = req.body.status;
  if (req.body.paymentInfo && req.body.paymentInfo.status) {
    order.paymentInfo.status = req.body.paymentInfo.status;
  }
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

  if (order.orderStatus !== "canceled" && order.orderStatus !== "Delivered") {
    // Lặp qua từng mục đơn hàng và cập nhật lại số lượng sản phẩm
    for (const item of order.orderItems) {
      await cancelorder(item.product, item.variant, item.size, item.quantity);
    }
  }

  await Order.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
  });
});

// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHandler("No order found with this ID", 404));
//   }

//   for (const item of order.orderItems) {
//     await updateStock(item.product, item.variant, item.size, -item.quantity);
//   }

//   await Order.findByIdAndRemove(req.params.id);

//   res.status(200).json({
//     success: true,
//   });
// });

async function cancelorder(id, variantId, size, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    console.error(`Product not found: ${id}`);
    return;
  }

  let variantFound = false;
  let sizeFound = false;

  product.variants.forEach((variant) => {
    if (variant.id.toString() === variantId.toString()) {
      variantFound = true;
      variant.inventory.forEach((value) => {
        if (value.size === size) {
          sizeFound = true;
          value.stock += quantity; // Tăng số lượng tồn kho
          variant.totalStock += quantity;
          product.totalStock += quantity;
        }
      });
    }
  });

  if (!variantFound) {
    console.error(`Variant not found: ${variantId} for product: ${id}`);
  }

  if (!sizeFound) {
    console.error(
      `Size not found: ${size} for variant: ${variantId} in product: ${id}`
    );
  }

  await product.save(); // Save the updated product
}

exports.checkOrderReview = catchAsyncErrors(async (req, res, next) => {
  const { userId, productId } = req.body;
  const orders = await Order.find({ user: userId });
  let hasPurchased = false;
  // if (order.orderStatus === "canceled") {
  //   return;
  // }
  for (const order of orders) {
    if (order.orderStatus === "Delivered" ) {
      for (const item of order.orderItems) {
        if (item.product.toString() === productId) {
          hasPurchased = true;
          break;
        }
      }
    }
    if (hasPurchased) break;
  }

  res.status(200).json({
    success: true,
    hasPurchased,
  });
});

exports.getOrderStats = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({
    orderStatus: "Delivered",
    deliverAt: { $exists: true },
  });

  const monthlyRevenue = {};
  const monthlyOrderCount = {};

  orders.forEach((order) => {
    if (order.deliverAt) {
      // Kiểm tra nếu trường deliverAt tồn tại
      const deliverDate = new Date(order.deliverAt);
      const month = deliverDate.getMonth() + 1; // Tháng từ 0-11
      const year = deliverDate.getFullYear();
      const key = `${year}-${month}`;
      if (!monthlyRevenue[key]) {
        monthlyRevenue[key] = 0;
        monthlyOrderCount[key] = 0;
      }

      monthlyRevenue[key] += order.totalPrice;
      monthlyOrderCount[key] += 1;
    }
  });

  res.status(200).json({
    success: true,
    monthlyRevenue,
    monthlyOrderCount,
  });
});
