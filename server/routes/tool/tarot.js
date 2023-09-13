const express = require('express');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');
const { TarotController } = require('../../controller/tool.controller/tarot.controller');
const upload = require('../../middlewares/upload')

const router = express.Router();

// BASE URL: /api/v1/tool
router.post(
    "/tarot",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    upload.fields([
        { name: 'frontImg', maxCount: 1 },
        { name: 'backImg', maxCount: 1 },
    ]),
    TarotController.CreateTarot
);

module.exports = router;