const Cart = require("../models/cart");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItems } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      cartItems,
    });
  } else {
    const existingItemIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === cartItems[0].product &&
        item.size === cartItems[0].size &&
        item.color.colorHex === cartItems[0].color.colorHex
    );
    if (existingItemIndex !== -1) {
      cart.cartItems[existingItemIndex].quantity = cartItems[0].quantity;
    } else {
      cart.cartItems.push(...cartItems);
    }

    await cart.save();
  }

  let newCart;
  try {
    newCart = await Cart.findOne({ user: req.user.id });
  } catch (error) {
    console.error("Error finding cart:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }

  res.status(200).json({
    success: true,
    cart: newCart.cartItems,
  });
});

exports.getUserCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const cartItems = cart.cartItems;

  res.status(200).json({
    success: true,
    cartItems,
  });
});

exports.removeProductFromCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const { id, size } = req.params;

  const updatedCartItems = cart.cartItems.filter(
    (item) => !(item.product.toString() === id && item.size.toString() === size)
  );

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $set: { cartItems: updatedCartItems } },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

exports.emptyTheCart = catchAsyncErrors(async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    cart.cartItems = [];
    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Cart emptied successfully" });
  } catch (error) {
    console.error("Error emptying the cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

exports.updateCartQuantity = catchAsyncErrors(async (req, res, next) => {
  try {
    const { product, quantity, size, color } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ success: false, error: "Cart not found" });
    }

    forEach(cart.cartItems, (item) => {
      if (
        item.product.toString() === product &&
        item.size === size &&
        item.color.colorHex === color
      ) {
        item.quantity = item.quantity + quantity;
        res
          .status(200)
          .json({ success: true, message: "Quantity update successfully" });
      }
    });
  } catch (error) {
    console.error("Error emptying the cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
