const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the database connection function
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Swagger UI setup
let swaggerDocument;
try {
  swaggerDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
} catch (err) {
  console.error('Failed to load OpenAPI spec:', err);
}
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});