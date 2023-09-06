const express = require('express');
const { ChatController } = require('../../controller/chat.controller/chat.controller');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');

const router = express.Router();

// BASE URL: /api/v1/chat

router.get(
    "/",
    auth(Constants.ENUM_USER_ROLE.ADMIN, Constants.ENUM_USER_ROLE.USER),
    ChatController.getChatByAuthenticatedId
);
router.post(
    "/",
    auth(Constants.ENUM_USER_ROLE.ADMIN, Constants.ENUM_USER_ROLE.USER),
    ChatController.createChat
);

module.exports = router;