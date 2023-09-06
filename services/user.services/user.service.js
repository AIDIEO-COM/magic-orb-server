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

module.exports.UserService = {
    getAllUsersService,
}