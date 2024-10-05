// authRoutes.js
const express = require('express');
const { register, login } = require('./authController');
const authenticateToken = require('./authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
