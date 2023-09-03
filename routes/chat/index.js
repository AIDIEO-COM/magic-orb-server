const express = require('express');

const router = express.Router();

// BASE URL: /api/v1/chat

router.use("/", require("./chat"));

module.exports = router;