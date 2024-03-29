const express = require('express');

const router = express.Router();


// BASE URL: /api/v1/

router.use("/user", require("./user"));
router.use("/chat", require("./chat"));
router.use("/tool", require("./tool"));


module.exports = router;