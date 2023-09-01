const express = require('express');

const router = express.Router();


// BASE URL: /api/v1/

router.use("/user", require("./user"));


module.exports = router;