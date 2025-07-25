# Inventory Management Tool - Backend API

This repository contains the backend server for an Inventory Management Tool. The server exposes REST APIs to manage users, products, and analytics, featuring JWT-based authentication for secure access. The backend is fully containerized using Docker for easy deployment and environment consistency.

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Role-Based Access:** Users have roles (`user`, `admin`). Some endpoints are admin-only.
- **Product Management:**
  - Add new products to the inventory (protected route).
  - Update the quantity of existing products (protected route).
  - Retrieve a paginated list of all products (protected route).
  - Products include name, type, SKU, image URL, description, quantity, and price.
- **Analytics:**
  - Get top products by quantity (`/analytics/top-products`).
- **API Documentation:** OpenAPI (Swagger) documentation available at `/docs`.
- **Containerization:** Docker support for easy deployment.
- **Environment Variables:** Managed via `.env` file.
- **Testing:** Sample API test script provided in `test_api.py`.

## Technology Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **Containerization:** Docker
- **API Documentation:** OpenAPI (Swagger)

## API Security & Roles
- Most endpoints require authentication via JWT (see `.env` for `JWT_SECRET`).
- Some endpoints (e.g., `/users`, `/analytics/top-products`) require the user to have an `admin` role.
- See `models/User.js` for user roles and default values.

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

Follow these steps to set up and run the project locally or in a container.

### Prerequisites
- Node.js (v14 or newer) and npm (for local setup)
- Docker (for containerized setup)
- A MongoDB database instance (local or via a service like MongoDB Atlas)

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
Create a file named `.env` in the root of the project directory and add the following configuration variables:

```env
# The port your server will run on
PORT=3000

# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string

# A long, random, and secret string for signing JWTs
JWT_SECRET=your_jwt_secret_key
```

### How to Run the Server

#### Locally
To start the server, run:
```sh
npm start
```
You should see output confirming the server is running and connected to the database:
```
MongoDB connected successfully.
Server is running on port 3000
```

#### With Docker
To build and run the containerized backend:
```sh
# Build the Docker image
docker build -t epify-backend .

# Run the container (make sure your .env file is present)
docker run --env-file .env -p 3000:3000 epify-backend
```

#### Docker Ignore
The `.dockerignore` file is used to exclude files and folders from the Docker build context, making builds faster and more secure. Example contents:
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

All product-related endpoints are protected and require a Bearer Token in the Authorization header.

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
Returns top products by quantity.

> This route may require an `Authorization: Bearer <token>` header if restricted to admin users.

### Admin

#### GET /users
Retrieves a list of all registered users in the system.

> This route is admin-only and requires an `Authorization: Bearer <token>` header.

## API Documentation
The API is documented using OpenAPI. See `openapi.yaml` for the full specification. You can import the Postman collection (`Inventory Management API.postman_collection.json`) for example requests.

## Testing
A sample test script is provided in `test_api.py` (Python, uses `requests`).

1. Make sure the server is running (locally or in Docker).
2. Run the script:
   ```sh
   python test_api.py
   ```

## License
MIT
