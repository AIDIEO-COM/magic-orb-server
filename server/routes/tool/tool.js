const express = require('express');
const auth = require('../../middlewares/auth');
const { Constants } = require('../../configs/constant');
const { ToolController } = require('../../controller/tool.controller/tool.controller');

const router = express.Router();

// BASE URL: /api/v1/tool

router.get(
    "/default",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    ToolController.getMagicORBDefault
);

router.post(
    "/default",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    ToolController.UpdateORInsertORBDeafultChat
);

router.patch(
    "/default/:defaultId",
    auth(Constants.ENUM_USER_ROLE.ADMIN),
    ToolController.UpdateDefaultOtherFields
);

module.exports = router;