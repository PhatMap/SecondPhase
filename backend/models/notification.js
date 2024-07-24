const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return (
        "NOTIF_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5)
      );
    },
  },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["success", "error", "warning", "info"],
    default: "info",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  link: { type: String, required: false },
  priority: {
    type: Number,
    default: 0,
  },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notificationSchema);
