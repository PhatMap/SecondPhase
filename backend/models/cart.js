const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      size: {
        type: String,
        required: true,
        enum: {
          values: ["XS", "S", "M", "L", "XL", "XXL"],
          message: "Please select correct size for product",
        },
      },
      color: {
        colorName: {
          type: String,
          required: [true, "please enter color name"],
        },
        colorHex: {
          type: String,
          required: [true, "please enter color hex"],
        },
      },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
