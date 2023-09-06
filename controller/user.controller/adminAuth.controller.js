const httpStatus = require("http-status");
const { AdminAuthService } = require("../../services/user.services/adminAuth.service");
const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");

const createUserAdmin = catchAsync(
    async (req, res) => {
        const result = await AdminAuthService.createUserAdminService(req.body);
        sendResponse(res, httpStatus.CREATED, true, "User created successfully", result)
    })


const loginAdmin = catchAsync(
    async (req, res) => {
        const { email, password } = req.body;
        const { user, token } = await AdminAuthService.AdminloginUserService({ email, password });

        sendResponse(
            res,
            httpStatus.OK,
            true,
            "Logged in successfully",
            {
                user,
                token
            }
        )
    })

module.exports.AdminAuthController = {
    loginAdmin,
    createUserAdmin
}