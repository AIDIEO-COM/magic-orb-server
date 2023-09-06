const express = require('express');
const { AdminAuthController } = require('../../controller/user.controller/adminAuth.controller');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');

const router = express.Router();

// BASE URL: /api/v1/user/auth/admin

router.post(
    "/register",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    AdminAuthController.createUserAdmin
);

router.post(
    "/login",
    AdminAuthController.loginAdmin
);

module.exports = router;