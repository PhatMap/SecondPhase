const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shopInfor: {
    shopName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    pickupAddress: {
      contactName: {
        type: String,
        required: true,
      },
      contactPhone: {
        type: String,
        required: true,
      },
      address: {
        province: {
          type: String,
          required: true,
        },
        district: {
          type: String,
          required: true,
        },
        ward: {
          type: String,
          required: true,
        },
        detailed: {
          type: String,
          required: true,
        },
      },
    },
    email: {
      type: String,
      required: true,
    },
    primaryPhone: {
      type: String,
      required: true,
    },
  },
  shippingMethod: [
    {
      name: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  taxInfor: {
    taxCode: {
      type: String,
      required: true,
    },
    billingEmail: {
      type: String,
      required: true,
    },
    businessAddress: {
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      ward: {
        type: String,
        required: true,
      },
      detailed: {
        type: String,
        required: true,
      },
    },
  },
  identificationInfor: {
    citizenId: {
      type: String,
      required: true,
    },
    idCardImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    selfieWithId: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  inforConfirm: {
    type: Boolean,
    required: true,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = mongoose.model("Application", applicationSchema);
