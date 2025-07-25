# Inventory Management Tool - Backend API

This backend API provides a complete solution for inventory management, including user authentication, product management, analytics, and robust documentation. The API is designed for easy deployment and scalability, with full containerization and OpenAPI support.

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Role-Based Access:** Users can have roles (`user`, `admin`). Admin-only endpoints are supported.
- **Product Management:**
  - Add new products to the inventory
  - Update product quantity
  - Retrieve a paginated list of products
  - Products include name, type, SKU, image URL, description, quantity, and price
- **Analytics:**
  - Get top products by quantity (`/analytics/top-products`)
- **Admin Endpoints:**
  - Retrieve all registered users (`GET /users`, admin-only)
- **API Documentation:**
  - Full OpenAPI (Swagger) documentation available in `openapi.yaml`
  - Interactive docs at `/docs` when running the API
- **Containerization:**
  - Dockerfile and `.dockerignore` included for easy deployment
  - Run the API in any environment with Docker

## Technology Stack
- Node.js, Express.js
- MongoDB (Mongoose ODM)
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Docker
- OpenAPI (Swagger)

## Project Structure
```
EpifyBackend/
├── config/
│   └── db.js              # MongoDB connection setup
├── controllers/
│   ├── analyticsController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── analyticsRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── index.js               # Main server file
├── package.json
├── openapi.yaml           # OpenAPI spec for API documentation
├── Inventory Management API.postman_collection.json # Postman collection
├── Dockerfile             # Docker build instructions
├── .dockerignore          # Files/folders to ignore in Docker builds
└── test_api.py            # Python script for API testing
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or newer) and npm (for local setup)
- Docker (for containerized setup)
- MongoDB database instance (local or MongoDB Atlas)

### 1. Clone the Repository
```sh
git clone <your-repository-url>
cd EpifyBackend
```

### 2. Install Dependencies (Local Only)
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### How to Run the Server

#### Locally
```sh
npm start
```

#### With Docker
```sh
# Build the Docker image
docker build -t epify-backend .

# Run the container (make sure your .env file is present)
docker run --env-file .env -p 3000:3000 epify-backend
```

#### Docker Ignore
The `.dockerignore` file excludes files and folders from the Docker build context, making builds faster and more secure. Example contents:
```ignore
node_modules
npm-debug.log
.env
Dockerfile
.dockerignore
.git
.gitignore
```

## API Endpoints Guide

### User Authentication

#### POST /register
Registers a new user.

**Body:**
```json
{ "username": "string", "password": "string" }
```

#### POST /login
Logs in an existing user.

**Body:**
```json
{ "username": "string", "password": "string" }
```

**Response:** Returns an `access_token` on success.

### Product Management

#### POST /products
Adds a new product to the inventory.

**Body:**
```json
{
  "name": "string",
  "type": "string",
  "sku": "string",
  "image_url": "string",
  "description": "string",
  "quantity": integer,
  "price": number
}
```

#### GET /products
Retrieves a list of all products.

**Pagination:** Use query parameters `?page=<number>&limit=<number>`.

#### PUT /products/{id}/quantity
Updates the quantity of a specific product.

**Body:**
```json
{ "quantity": integer }
```

> All product routes require an `Authorization: Bearer <token>` header.

#### Example Product Object
```json
{
  "name": "Phone",
  "type": "Electronics",
  "sku": "PHN-001",
  "image_url": "https://example.com/phone.jpg",
  "description": "Latest Phone",
  "quantity": 5,
  "price": 999.99
}
```

### Analytics

#### GET /analytics/top-products
Returns the top 5 products by quantity in descending order.

> This route is admin-only and requires an `Authorization: Bearer <token>` header.

### Admin

#### GET /users
Retrieves a list of all registered users in the system.

> This route is admin-only and requires an `Authorization: Bearer <token>` header.

## API Documentation
- The API is documented using OpenAPI. See `openapi.yaml` in the repository for the full specification.
- Interactive Swagger UI is available at `/docs` when the server is running.
- You can import the Postman collection (`Inventory Management API.postman_collection.json`) for example requests.

## Testing
A sample test script is provided in `test_api.py` (Python, uses `requests`).

1. Make sure the server is running (locally or in Docker).
2. Run the script:
   ```sh
   python test_api.py
   ```

## License
MIT
