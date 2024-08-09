const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return (
        "SHOP_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5)
      );
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
  stats: {
    joined: Number,
    totalProduct: Number,
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Shop", shopSchema);
