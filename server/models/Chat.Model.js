const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    messages: {
        type: [
            {
                role: {
                    type: String
                },
                content: {
                    type: String
                },
                createdContentAt: {
                    type: String
                },
            }
        ]
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;