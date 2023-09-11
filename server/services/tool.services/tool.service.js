const ORBDefault = require("../../models/ORBDefault");


const getMagicORBDefaultChatService = async () => {
    const datas = await ORBDefault.find();
    return datas[0];
}

const UpdateORInsertORBDeafultChatService = async (content) => {

    let result;

    // checking is role available
    const getORBDefault = await ORBDefault.find();

    if (getORBDefault.length > 0) {
        // updating default chat
        result = await ORBDefault.findOneAndUpdate({ _id: getORBDefault[0]._id }, {
            $set: content
        }, { runValidators: true, new: true })
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
const UpdateDefaultOtherFieldsService = async (defaultId, data) => {

    delete data.content;
    console.log(data);

    // updating others fileds
    const result = await ORBDefault.findOneAndUpdate({ _id: defaultId }, {
        $set: data
    }, { runValidators: true, new: true })

    return result;
}


module.exports.ToolService = {
    getMagicORBDefaultChatService,
    UpdateORInsertORBDeafultChatService,
    UpdateDefaultOtherFieldsService
}