const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  categoryName: {
    type: String,
    required: true,
  },
  vietnameseName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
