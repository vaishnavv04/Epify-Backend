const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers, // Import getUsers
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import admin

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin-only route
router.get('/users', protect, admin, getUsers);

module.exports = router;