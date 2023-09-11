const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'User required!']
    },
    isPrompt: {
        type: Boolean,
        default: false

        // if ture will send new promt message
        // when creating will be false bcoz will take default prompt message
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