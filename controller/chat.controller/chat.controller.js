const httpStatus = require("http-status");
const sendResponse = require("../../shared/sendResponse");
const OpenAI = require('openai');
const Chat = require("../../models/Chat.Model");
const { default: ApiError } = require("../../shared/ApiError");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const createChat = async (req, res, next) => {
    try {

        // message
        const { message } = req.body;

        // user information
        const { user } = req;
        const userId = user.id;

        let messageData = [];
        const findChat = await Chat.findOne({ user: userId });

        // console.log(findChat);
        // console.log(message.content);

        // console.log(message[0].content === 'Hello Magic Orb' && findChat === null);

        if (!findChat) {
            messageData.push({
                role: 'user',
                content: `you are role playing as an all knowing mystical orb.Inside of your orb, you transmit visions of the future using multiple options of divination (tarot, astrology, numerology, etc.) When it's relevant, ask questions about their astrological signs, discover their numerology information, and ask about symbols from recent dreams relative to the situation.You also interpret symbols in the seeker's daily life and nightly dreams.You give "new age" type guidance to those looking for answers to their problems, by telling them fortunes, new age spiritual tips, etc.When you predict the future, it is extremely important to be convincing by using real divination techniques used throughout the modern world. Gather necessary information about the user before jumping to unnecessary conclusions.Your goal is not to judge right from wrong, but to find out if these symbols of divination truly match the user's questions. Keep all judgements to a low.`
            })
        } else {

            findChat.messages.map((item) => {
                messageData.push({
                    role: item.role,
                    content: item.content
                })
            })
        }

        // console.log(messageData, 'msg data');

        const completion = await openai.chat.completions.create({
            messages: [
                ...messageData,
                ...message,
            ],
            model: 'gpt-3.5-turbo',
        });


        if (completion && completion.choices && completion.choices[0]) {

            // finding is there any chat exists
            const findChat = await Chat.findOne({ user: userId });

            // data format
            const data = {
                user: userId,
                messages: [
                    {
                        role: message[0].role,
                        content: message[0].content,
                        createdContentAt: Date.now(),
                    },
                    {
                        role: completion.choices[0].message.role,
                        content: completion.choices[0].message.content,
                        createdContentAt: Date.now(),
                    }
                ],
            }

            // console.log(data, 'data');

            let resData;

            if (!findChat || findChat === null) {
                resData = new Chat(data);
                await resData.save();
            } else {
                updatedDoc = await Chat.updateOne({ user: userId }, {
                    $push: {
                        messages: data.messages
                    }
                }, { new: true })

                if (updatedDoc.acknowledged && updatedDoc.modifiedCount === 1) {
                    resData = await Chat.findOne({ user: userId });
                }
            }

            sendResponse(res, httpStatus.CREATED, true, "Chat generated successfully", resData)
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Reques failed with magic orb!')
        }
    } catch (err) {
        next(err)
    }
}

module.exports.ChatController = {
    createChat,
}

// initial first message
// {
//     "message": [
//         {
//             "role": "user",
//             "content": "Hello Magic Orb"
//         }
//     ]
// }