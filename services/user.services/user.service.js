const User = require("../../models/User.Model");

const getAllUsersService = async () => {
    const datas = await User.find();

    const data = {
        meta: {
            count: datas.length
        },
        datas
    }

    return data;
}

const getUserService = async (userId) => {
    const data = await User.findById(userId);
    return data;
}

module.exports.UserService = {
    getAllUsersService,
    getUserService,
}