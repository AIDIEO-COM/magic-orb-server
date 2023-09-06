const express = require('express');
const { UserController } = require('../../controller/user.controller/user.controller');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');

const router = express.Router();

// BASE URL: /api/v1/user

router.get(
    "/",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    UserController.getAllUsers
);

router.get(
    "/:userId",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    UserController.getUser
);

router.patch(
    "/:userId",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    UserController.updateUser
);

router.delete(
    "/:userId",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    UserController.deleteUser
);


module.exports = router;