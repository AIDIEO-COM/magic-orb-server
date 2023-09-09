const ORBDefaultMsg = require("../../models/ORBDefaultMsg");

const getMagicORBDefaultChatService = async () => {
    const datas = await ORBDefaultMsg.find();
    return datas[0];
}

const UpdateORInsertORBDeafultChatService = async (content) => {

    let result;

    // checking is role available
    const getORBDefaultMsg = await ORBDefaultMsg.find();

    if (getORBDefaultMsg.length > 0) {
        // updating role
        result = await ORBDefaultMsg.findOneAndUpdate({ _id: getORBDefaultMsg[0]._id }, {
            $set: content
        }, { runValidators: true, new: true })
    } else {
        // creating default message
        result = await ORBDefaultMsg.create(content);
    }

    return result;
}


module.exports.ToolService = {
    getMagicORBDefaultChatService,
    UpdateORInsertORBDeafultChatService
}