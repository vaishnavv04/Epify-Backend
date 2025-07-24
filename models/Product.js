const mongoose = require('mongoose');

// Define the schema for the Product collection
const ProductSchema = new mongoose.Schema({
name: {
  type: String,
  required: [true, 'Please provide a product name'], // Product name is required
},
type: {
  type: String,
  required: [true, 'Please provide a product type'], // Product type is required
},
sku: {
  type: String,
  required: [true, 'Please provide a SKU'], // SKU is required
  unique: true, // Each SKU must be unique
},
description: {
  type: String, // Description is optional
},
image_url: {
  type: String, // Image URL is optional
},
quantity: {
  type: Number,
  required: [true, 'Please provide a quantity'], // Quantity is required
  default: 0,
},
price: {
  type: Number,
  required: [true, 'Please provide a price'], // Price is required
},
}, {
// Add timestamps for 'createdAt' and 'updatedAt' fields
timestamps: true,
});

// Create and export the Product model
// Mongoose will create a collection named 'products' based on this model
module.exports = mongoose.model('Product', ProductSchema);