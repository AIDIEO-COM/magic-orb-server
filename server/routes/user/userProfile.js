const express = require('express');
const { UserProfileController } = require('../../controller/user.controller/userProfile.controller');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');
const router = express.Router();

// BASE URL: /api/v1/user/auth

router.get(
    "/",
    auth(Constants.ENUM_USER_ROLE.ADMIN, Constants.ENUM_USER_ROLE.USER),
    UserProfileController.getUserProfile
);


module.exports = router;