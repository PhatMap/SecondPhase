const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "Product name can not exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Product price cannot be negative",
    },
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
  variants: [
    {
      name: {
        type: String,
        required: true,
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
      inventory: [
        {
          size: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: [true, "please enter product price"],
            validate: {
              validator: function (value) {
                return value >= 0;
              },
              message: "Product price cannot be negative",
            },
          },
          stock: {
            type: Number,
            required: true,
            maxLength: [5, "Product stock cannot exceed 5 characters"],
            default: 0,
            validate: {
              validator: function (value) {
                return value >= 0;
              },
              message: "Product stock cannot be negative",
            },
          },
        },
      ],
      totalStock: {
        type: Number,
        required: true,
        default: 0,
        validate: {
          validator: function (value) {
            return value >= 0;
          },
          message: "Product total stock cannot be negative",
        },
      },
    },
  ],
  totalStock: {
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Product total stock cannot be negative",
    },
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
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
  status: {
    type: String,
    required: true,
    default: "inactive",
  },
  approved: {
    type: String,
    required: true,
    default: "waiting",
  },
  approvedAt: {
    type: Date,
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);
