const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProductQuantity,
  getProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Add new product route
// This route is protected, meaning a user must be logged in to access it.
router.post('/', protect, addProduct);

// Update product quantity route
router.put('/:id/quantity', protect, updateProductQuantity);

// Get all products route
router.get('/', protect, getProducts);

module.exports = router;