const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return (
        "STAT_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5)
      );
    },
  },
  id: { type: String },
  data: [
    {
      date: {
        type: String,
        required: true,
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
      },
    },
  ],
});

module.exports = mongoose.model("Stat", statSchema);
