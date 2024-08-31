const mongoose = require("mongoose");
const product = require("./product");

const shopSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return (
        "SHOP_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5)
      );
    },
  },
  avatar: {
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dfbo1ecn9/image/upload/v1725099578/avatars/default_ttizso.png",
    },
    public_id: {
      type: String,
      default: "default_ttizso",
    },
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sections: [
    {
      name: String,
      images: [
        {
          url: String,
          public_id: String,
        },
      ],
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      products: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Shop", shopSchema);
