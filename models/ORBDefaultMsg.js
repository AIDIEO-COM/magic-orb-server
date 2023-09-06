const mongoose = require('mongoose');

const ORBDefaultMsgSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Content message is required!']
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const ORBDefaultMsg = mongoose.model("ORBDefaultMsg", ORBDefaultMsgSchema);
module.exports = ORBDefaultMsg;