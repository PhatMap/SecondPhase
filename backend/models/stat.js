const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Map,
    of: {
      type: Map,
      of: {
        type: Map,
        of: {
          type: mongoose.Schema.Types.Mixed, 
        },
        value: mongoose.Schema.Types.Mixed,
      },
      value: mongoose.Schema.Types.Mixed, 
    },
  },
});

module.exports = mongoose.model("Stat", statSchema);
