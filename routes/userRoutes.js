const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Handles user registration
router.post('/register', registerUser);

// Handles user login
router.post('/login', loginUser);

module.exports = router;