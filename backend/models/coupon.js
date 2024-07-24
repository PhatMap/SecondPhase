const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    percentage: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    idCreator: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    target: {
        type: {
            type: String,
            required: true
        },
        ids:[ {
            type: String,
            required: true,
        }]
    },
    quantity: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Coupon", couponSchema);
