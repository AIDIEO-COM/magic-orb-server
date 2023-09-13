const express = require('express');

const router = express.Router();

// BASE URL: /api/v1/chat

router.use("/", require("./tool"));
router.use("/", require("./tarot"));

module.exports = router;