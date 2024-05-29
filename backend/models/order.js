const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
      province: {
        type: String,
        required: false,
      },
      district: {
        type: String,
        required: false,
      },
      town: {
        type: String,
        required: false,
      },
      location: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        required: false,
      },
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      variant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      inventory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      name: {
        type: String,
        required: true,
      },
      variantName: {
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
      size: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliverAt: {
    type: Date,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
