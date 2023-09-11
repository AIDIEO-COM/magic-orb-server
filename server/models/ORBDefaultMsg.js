const mongoose = require('mongoose');

const ORBDefaultSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content message is required!']
    },
    filterFields: [{
        type: String,
        required: [true, 'Filter field is required!']
    }],
    gptVersion: {
        type: String,
        required: [true, 'Chat GPT version is required!']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const ORBDefault = mongoose.model("ORBDefault", ORBDefaultSchema);
module.exports = ORBDefault;