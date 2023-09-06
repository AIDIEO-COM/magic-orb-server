const express = require('express');
const { AdminAuthController } = require('../../controller/user.controller/adminAuth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// BASE URL: /api/v1/user/auth/admin

router.post("/register", AdminAuthController.createUserAdmin);
router.post("/login", AdminAuthController.loginAdmin);

module.exports = router;