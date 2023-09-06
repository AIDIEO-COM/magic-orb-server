const express = require('express');

const router = express.Router();

// BASE URL: /api/v1/chat

router.use("/", require("./tool"));

module.exports = router;