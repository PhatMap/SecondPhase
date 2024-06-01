const Cart = require("../models/cart");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItems } = req.body;
  const { product, variant, inventory, size, quantity } = cartItems[0];

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      cartItems,
    });
  } else {
    const existingItemIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === product &&
        item.variant.toString() === variant &&
        item.size.toString() === size
    );
    if (existingItemIndex !== -1) {
      cart.cartItems[existingItemIndex].quantity =
        quantity + cart.cartItems[existingItemIndex].quantity;
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

exports.getUserCartProduct = catchAsyncErrors(async (req, res, next) => {
  const { item } = req.body;
  const { product, variant, inventory, size, quantity } = item[0];

  const cart = await Cart.findOne({
    user: req.user.id,
  });

  const currentItem = cart.cartItems.find(
    (cartItem) =>
      cartItem.product.toString() === product.toString() &&
      cartItem.variant.toString() === variant.toString() &&
      cartItem.size.toString() === size.toString()
  );

  if (!currentItem) {
    return res.status(200).json({
      success: true,
      message: "Item not found in the cart",
    });
  }

  const theProduct = await Product.findById(product);

  let productQuantity = 0;

  theProduct.variants.map((variant, index) => {
    if (variant._id.toString() === variant.toString()) {
      variant.inventory.map((item, index) => {
        if (item.size === size) {
          productQuantity = item.stock;
        }
      });
    }
  });

  const total = currentItem.quantity + quantity;

  if (total > productQuantity) {
    return res.status(400).json({
      success: false,
      message: "Quantity exceeds the available stock",
    });
  } else {
    res.status(200).json({
      success: true,
    });
  }
});

exports.removeProductFromCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const { id, variant, size } = req.params;

  const updatedCartItems = cart.cartItems.filter(
    (item) =>
      !(
        item.product.toString() === id &&
        item.variant.toString() === variant &&
        item.size === size
      )
  );

  console.log(updatedCartItems);

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
    const { product, quantity, size } = req.body;

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
