const User = require("../../models/User.Model");

const getUserProfile = async (email) => {
    return await User.findOne({ email }).select("-password");
}

module.exports.UserProfileService = {
    getUserProfile
}