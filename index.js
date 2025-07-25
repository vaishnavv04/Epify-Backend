const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the database connection function
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});