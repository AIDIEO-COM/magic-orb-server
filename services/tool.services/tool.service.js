const ORBDefaultMsg = require("../../models/ORBDefaultMsg");

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
    UpdateORInsertORBDeafultChatService
}