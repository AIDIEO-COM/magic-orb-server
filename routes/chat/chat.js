const express = require('express');
const { ChatController } = require('../../controller/chat.controller/chat.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// BASE URL: /api/v1/chat

router.get("/", auth, ChatController.getChatByAuthenticatedId);
router.post("/", auth, ChatController.createChat);

module.exports = router;