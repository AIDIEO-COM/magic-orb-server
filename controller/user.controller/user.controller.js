const httpStatus = require("http-status");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const { UserService } = require("../../services/user.services/user.service");

const getAllUsers = catchAsync(
    async (req, res) => {
        const result = await UserService.getAllUsersService();
        sendResponse(res, httpStatus.CREATED, true, "Users retrived successfully", result)
    })

module.exports.UserController = {
    getAllUsers,
}