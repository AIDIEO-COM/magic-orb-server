const httpStatus = require("http-status");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const { UserService } = require("../../services/user.services/user.service");

const getAllUsers = catchAsync(
    async (req, res) => {
        const result = await UserService.getAllUsersService();
        sendResponse(res, httpStatus.OK, true, "Users retrived successfully", result)
    })


const getUser = catchAsync(
    async (req, res) => {
        const result = await UserService.getUserService(req.params.userId);
        sendResponse(res, httpStatus.OK, true, "User retrived successfully", result)
    })

module.exports.UserController = {
    getAllUsers,
    getUser,
}