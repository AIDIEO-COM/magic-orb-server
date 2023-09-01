const { UserProfileService } = require("../../services/user.services/userProfile.service");
const sendResponse = require("../../shared/sendResponse");
const httpStatus = require("http-status");

const getUserProfile = async (req, res, next) => {
    try {
        const { user } = req;
        const userProfile = await UserProfileService.getUserProfile(user.email);
        sendResponse(res, httpStatus.OK, true, "User profile fetched successfully", userProfile)

    }
    catch (err) {
        next(err)
    }

}


module.exports.UserProfileController = {
    getUserProfile
}