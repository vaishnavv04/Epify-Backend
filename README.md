
# Inventory Management Tool - Backend API

This repository contains the backend server for an Inventory Management Tool, built as part of a project assignment. The server exposes REST APIs to manage users and products, featuring JWT-based authentication for secure access.

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Product Management:**
  - Add new products to the inventory.
  - Update the quantity of existing products.
  - Retrieve a paginated list of all products.

### Technology Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv

## Project Structure
```
Epify/
├── config/
│   └── db.js              # MongoDB connection setup
├── controllers/
│   ├── productController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── productRoutes.js
│   └── userRoutes.js
├── index.js               # Main server file
├── package.json
└── test_api.py            # Python script for API testing
```

## Setup and Installation

Follow these steps to set up and run the project locally.

### Prerequisites
- Node.js (v14 or newer)
- npm
- A MongoDB database instance (local or via a service like MongoDB Atlas)

### 1. Clone the Repository
```sh
git clone <your-repository-url>
cd Epify
```

### 2. Install Dependencies
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
To start the server, run the following command:
```sh
npm start
```
You should see the following output in your terminal, confirming the server is running and connected to the database:

```
MongoDB connected successfully.
Server is running on port 3000
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
{ "name": "string", "type": "string", "sku": "string", "quantity": integer, "price": number }
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

## Testing
A sample test script is provided in `test_api.py` (Python, uses `requests`).

1. Make sure the server is running.
2. Run the script:
   ```sh
   python test_api.py
   ```

## License
MIT
