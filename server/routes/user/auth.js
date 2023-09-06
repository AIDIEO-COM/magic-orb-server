const express = require('express');
const { AuthController } = require('../../controller/user.controller/auth.controller');

const router = express.Router();

// BASE URL: /api/v1/user/auth

router.post("/register", AuthController.createUser);
router.post("/login", AuthController.loginUser);


module.exports = router;