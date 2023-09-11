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

const updateUserService = async (userId, body) => {

    // checking is role available
    const user = await User.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is user available!');

    // updating role
    const result = await User.findOneAndUpdate({ _id: userId }, {
        $set: body
    }, { runValidators: true, new: true })

    return result;
}

const deleteUserService = async (userId) => {

    // checking is role available
    const user = await User.findById(userId);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Check is user available!');

    // deleting data
    const result = await User.deleteOne({ _id: userId })
    return result;
}

module.exports.UserService = {
    getAllUsersService,
    getUserService,
    updateUserService,
    deleteUserService,
}