const express = require('express');
const router = express.Router();

const { registerUser, login } = require('../Controllers/AuthController')

router.route('/register').post(registerUser);
router.route('/login').post(login);

module.exports = router