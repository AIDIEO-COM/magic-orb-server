const httpStatus = require("http-status");
const { Constants } = require("../../configs/constant");
const User = require("../../models/User.Model");
const ApiError = require("../../shared/ApiError");
const { createToken } = require("../../helpers/jwtHelpers");

const createUserAdminService = async (user) => {

    // checking is user
    const isUser = await User.isUserExist(user.email);

    if (isUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Already exists with email!');
    }

    const result = await User.create(user);
    return result;
}

const AdminloginUserService = async ({ email, password }) => {

    // checking is user
    const user = await User.isUserExist(email);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user.role !== Constants.ENUM_USER_ROLE.ADMIN) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please contact with admin!');
    }

    const isMatch = await User.isPasswordMatched(password, user.password);

    if (!isMatch) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials!');
    }

    // generate token
    const token = createToken(user);

    return {
        user: {
            _id: user._id,
            id: user._id,
            email: user.email,
            role: user.role
        },
        token
    };
}

module.exports.AdminAuthService = {
    AdminloginUserService,
    createUserAdminService
}