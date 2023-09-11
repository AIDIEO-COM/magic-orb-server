const httpStatus = require("http-status");
const Chat = require("../../models/Chat.Model");
const ORBDefault = require("../../models/ORBDefault");
const ApiError = require("../../shared/ApiError");
const { default: mongoose } = require("mongoose");


const getMagicORBDefaultService = async () => {
    const datas = await ORBDefault.find();
    return datas[0];
}

const UpdateORInsertORBDeafultChatService = async (content) => {

    let result;

    // checking is role available
    const getORBDefault = await ORBDefault.find();

    if (getORBDefault.length > 0) {

        try {
            // Start a MongoDB transaction
            session = await mongoose.startSession();
            session.startTransaction();

            // updating default chat
            result = await ORBDefault.findOneAndUpdate(
                { _id: getORBDefault[0]._id }, {
                $set: content
            }, { runValidators: true, new: true, session })

            // Check if ORBDefault update was successful
            if (!result) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'ORBDefault update failed');
            }

            // Update Chat
            const chatUpdateResult = await Chat.updateMany({}, {
                $set: { isPrompt: true }
            }, { session });

            // Check if Chat update was successful
            if (chatUpdateResult.nModified <= 0) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Chat update failed');
            }
            // Commit the transaction
            await session.commitTransaction();
            return result;
        } catch (error) {
            if (session) {
                await session.abortTransaction();
            }
            throw error;
        } finally {
            if (session) {
                session.endSession();
            }
        }
    } else {
        // creating default message
        result = await ORBDefault.create({
            ...content,
            filterFields: ['I am chat gpt'],
            gptVersion: 'gpt-3.5-turbo'
        });
    }

    return result;
}

// updating default chat
// result = await ORBDefault.findOneAndUpdate({ _id: getORBDefault[0]._id }, {
//     $set: content
// }, { runValidators: true, new: true })

// await Chat.updateMany({}, { $set: { isPrompt: true } });

const UpdateDefaultOtherFieldsService = async (defaultId, data) => {

    // if any case content field value is there
    delete data.content;

    // updating others fileds
    const result = await ORBDefault.findOneAndUpdate({ _id: defaultId }, {
        $set: data
    }, { runValidators: true, new: true })

    return result;
}


module.exports.ToolService = {
    getMagicORBDefaultService,
    UpdateORInsertORBDeafultChatService,
    UpdateDefaultOtherFieldsService
}