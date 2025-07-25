const express = require('express');
const router = express.Router();
const { getTopProducts } = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

// Define the route and protect it with both 'protect' and 'admin' middleware
router.get('/top-products', protect, admin, getTopProducts);

module.exports = router;