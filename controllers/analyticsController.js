const Product = require('../models/Product');

/**
 * @desc    Get top products by quantity
 * @route   GET /analytics/top-products
 * @access  Private/Admin
 */
const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.aggregate([
      // Stage 1: Sort products by quantity in descending order
      { $sort: { quantity: -1 } },
      
      // Stage 2: Limit the results to the top 5
      { $limit: 5 }
    ]);

    res.status(200).json(topProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getTopProducts,
};