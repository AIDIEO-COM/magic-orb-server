const ORBDefault = require("../../models/ORBDefaultMsg");

const getMagicORBDefaultChatService = async () => {
    const datas = await ORBDefault.find();
    return datas[0];
}

const UpdateORInsertORBDeafultChatService = async (content) => {

    let result;

    // checking is role available
    const getORBDefault = await ORBDefault.find();

    if (getORBDefault.length > 0) {
        // updating role
        result = await ORBDefault.findOneAndUpdate({ _id: getORBDefault[0]._id }, {
            $set: content
        }, { runValidators: true, new: true })
    } else {
        // creating default message
        result = await ORBDefault.create(content);
    }

    return result;
}


module.exports.ToolService = {
    getMagicORBDefaultChatService,
    UpdateORInsertORBDeafultChatService
}