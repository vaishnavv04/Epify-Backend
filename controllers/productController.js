const Product = require('../models/Product');

/**
 * @desc    Add a new product
 * @route   POST /products
 */
const addProduct = async (req, res) => {
  const { name, type, sku, description, image_url, quantity, price } = req.body;

  try {
    const product = await Product.create({
      name,
      type,
      sku,
      description,
      image_url,
      quantity,
      price,
    });

    res.status(201).json({
      message: 'Product added successfully',
      product_id: product._id,
    });
  } catch (error) {
    // This handles the error if a product with the same SKU already exists
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Product with this SKU already exists' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Update product quantity
 * @route   PUT /products/:id/quantity
 */
const updateProductQuantity = async (req, res) => {
  const { quantity } = req.body;
  
  if (typeof quantity !== 'number') {
    return res.status(400).json({ message: 'Quantity must be a number' });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true } // This option returns the document after the update
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Quantity updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all products with pagination
 * @route   GET /products
 */
const getProducts = async (req, res) => {
  // Get 'page' and 'limit' from the query string, with default values
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  addProduct,
  updateProductQuantity,
  getProducts,
};