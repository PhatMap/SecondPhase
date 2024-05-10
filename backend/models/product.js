const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "Product name can not exceed 100 characters"],
  },
  colors: {
    colorName: {
      type: String,
      required: [true, "please enter color name"],
    },
    colorHex: {
      type: String,
      required: [true, "please enter color hex"],
    },
  },
  
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [5, "Product price can not exceed 5 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  sizes: [{
    type: String,
    required: false,
    enum: {
      values: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
      ],
      message: "Please select correct size for product",
    },
  }],
  category: {
    type: String,
    required: [true, "please select category for this product"],
    enum: {
      values: [
        "Trousers",
        "Shirt",
        "Dress",
        "Shoe",
        "Belt",
      ],
      message: "Please select correct category for product",
    },
  },
  seller: {
    type: String,
    requiredd: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [5, "Product stock can not exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = mongoose.model("Product", productSchema);
