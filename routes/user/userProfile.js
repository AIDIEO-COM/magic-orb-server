const express = require('express');
const { UserProfileController } = require('../../controller/user.controller/userProfile.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();

// BASE URL: /api/v1/user/auth

router.get("/", auth, UserProfileController.getUserProfile);


module.exports = router;