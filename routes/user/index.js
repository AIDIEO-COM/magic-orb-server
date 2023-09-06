const express = require('express');

const router = express.Router();

// BASE URL: /api/v1/user

router.use("/auth", require("./auth"));
router.use("/auth/admin", require("./adminAuth"));
router.use("/profile", require("./userProfile"));
router.use("/", require("./user"));


module.exports = router;