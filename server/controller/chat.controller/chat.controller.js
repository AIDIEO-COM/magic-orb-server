const httpStatus = require("http-status");
const sendResponse = require("../../shared/sendResponse");
const OpenAI = require('openai');
const Chat = require("../../models/Chat.Model");
const { default: ApiError } = require("../../shared/ApiError");
const { ToolService } = require("../../services/tool.services/tool.service");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getChatByAuthenticatedId = async (req, res, next) => {
    try {
        // user information
        const { user } = req;
        const userId = user.id;

        const chats = await Chat.findOne({ user: userId });
        sendResponse(res, httpStatus.CREATED, true, "Chat retrived successfully", chats ? chats : [])
    } catch (error) {
        next(error)
    }
}

const createChat = async (req, res, next) => {
    try {

        // message
        const { message } = req.body;

        // user information
        const { user } = req;
        const userId = user.id;

        let messageData = [];
        const findChat = await Chat.findOne({ user: userId });

        // get default message
        const magicORBDefaultData = await ToolService.getMagicORBDefaultService();

        // checking is content there
        if (!magicORBDefaultData.content) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Can not access default message!');
        }


        if (!findChat) {
            messageData.push({
                role: 'user',
                content: magicORBDefaultData.content
            })
        } else {
            // console.log(findChat);

            if (findChat.isPrompt === true) {
                findChat.messages.map((item, index) => {
                    messageData.push({
                        role: item.role,
                        content: item.content
                    })

                    // Check if it's the second-to-last item
                    if (index === findChat.messages.length - 2) {
                        messageData.push({
                            role: 'user',
                            content: magicORBDefaultData.content
                        });
                    }
                })
            } else {
                findChat.messages.map((item) => {
                    messageData.push({
                        role: item.role,
                        content: item.content
                    })
                })
            }
        }

        const createData = [
            ...messageData,
            ...message,
        ]

        // console.log(createData, 'create');

        const completion = await openai.chat.completions.create({
            messages: createData,
            model: magicORBDefaultData.gptVersion ? magicORBDefaultData.gptVersion : 'gpt-3.5-turbo',
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
            } else if (findChat.isPrompt === true) {
                updatedDoc = await Chat.updateOne({ user: userId }, {
                    $push: {
                        messages: data.messages
                    },
                    $set: {
                        isPrompt: false
                    }
                }, { new: true })

                if (updatedDoc.acknowledged && updatedDoc.modifiedCount === 1) {
                    resData = await Chat.findOne({ user: userId });
                }
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

            sendResponse(res, httpStatus.CREATED, true, "Chat generated successfully", resData);
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Reques failed with magic orb!');
        }
    } catch (err) {
        next(err)
    }
}

module.exports.ChatController = {
    createChat,
    getChatByAuthenticatedId,
}