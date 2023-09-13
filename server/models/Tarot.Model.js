const mongoose = require('mongoose');
const { Constants } = require('../configs/constant');

const TarotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    meanings: {
        upright: {
            type: String,
            required: [true, "Upright meaning is required"],
        },
        reversed: {
            type: String,
            required: [true, "Reversed meaning is required"],
        },
        advicePosition: {
            type: String,
            required: [true, "Advice position is required"],
        },
    },
    frontImg: {
        type: String,
        required: [true, "Front image is required"],
    },
    backImg: {
        type: String,
        required: [true, "Back image is required"],
    },
    deck: {
        type: String,
        required: [true, "Deck is required"],
    },
    status: {
        type: String,
        enum: {
            values: [Constants.ENUM_TAROT_STATUS.FREE, Constants.ENUM_TAROT_STATUS.PREMIUM],
            message: `Status value can not be {VALUE}, must be ${Constants.ENUM_TAROT_STATUS.FREE}/${Constants.ENUM_TAROT_STATUS.PREMIUM}`
        },
        default: Constants.ENUM_TAROT_STATUS.FREE
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const Tarot = mongoose.model("Tarot", TarotSchema);
module.exports = Tarot;