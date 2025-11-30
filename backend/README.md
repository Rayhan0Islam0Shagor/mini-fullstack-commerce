# Mini Commerce Backend API

A RESTful API built with Express.js and MongoDB for managing products and categories in an e-commerce application. This backend provides all the necessary endpoints for a modern shopping experience.

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Product Management**: Create, read, update, and delete products
- **Category Management**: Organize products into categories
- **Advanced Filtering**: Filter products by category, price, and more
- **Pagination Support**: Efficient data retrieval with pagination
- **Input Validation**: Request validation using Zod schemas
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **CORS Enabled**: Configured for cross-origin requests
- **MongoDB Integration**: Robust database operations with Mongoose

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository** (if you haven't already):

   ```bash
   git clone <repository-url>
   cd mini-commerce/backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` directory:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

   > **Note**: Replace the MongoDB connection string with your own. If you're using MongoDB Atlas, you can find your connection string in the Atlas dashboard.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port you specified in your `.env` file).

5. **Verify the server is running**:

   Open your browser or use curl:

   ```bash
   curl http://localhost:5000/api/v1/product
   ```

## 📡 API Endpoints

All API endpoints are prefixed with `/api/v1`. Here's a complete list of available endpoints:

### Products

#### Get All Products

```http
GET /api/v1/product
```

**Query Parameters** (optional):

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (e.g., `price`, `title`)
- `order` - Sort order (`asc` or `desc`)

**Example Request**:

```bash
curl http://localhost:5000/api/v1/product?page=1&limit=10&sort=price&order=asc
```

**Example Response**:

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Product Name",
      "price": 99.99,
      "image": "https://example.com/image.jpg",
      "category": "electronics",
      "description": "Product description"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

#### Get Product by ID

```http
GET /api/v1/product/:id
```

**Example Request**:

```bash
curl http://localhost:5000/api/v1/product/507f1f77bcf86cd799439011
```

#### Get Products by Category

```http
GET /api/v1/product/category/:categoryName
```

**Example Request**:

```bash
curl http://localhost:5000/api/v1/product/category/electronics
```

#### Create Product

```http
POST /api/v1/product/create-product
```

**Request Body**:

```json
{
  "title": "New Product",
  "price": 199.99,
  "image": "https://example.com/image.jpg",
  "category": "electronics",
  "description": "Product description",
  "stock": 100
}
```

**Example Request**:

```bash
curl -X POST http://localhost:5000/api/v1/product/create-product \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "price": 199.99,
    "image": "https://example.com/image.jpg",
    "category": "electronics",
    "description": "Product description"
  }'
```

#### Update Product

```http
PUT /api/v1/product/:id
```

**Request Body** (all fields optional):

```json
{
  "title": "Updated Product Name",
  "price": 249.99
}
```

#### Delete Product

```http
DELETE /api/v1/product/:id
```

### Categories

#### Get All Categories

```http
GET /api/v1/category
```

**Example Request**:

```bash
curl http://localhost:5000/api/v1/category
```

**Example Response**:

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Electronics",
      "image": "https://example.com/category.jpg"
    }
  ]
}
```

#### Create Category

```http
POST /api/v1/category
```

**Request Body**:

```json
{
  "name": "Electronics",
  "image": "https://example.com/category.jpg"
}
```

#### Update Category

```http
PUT /api/v1/category/:id
```

**Request Body**:

```json
{
  "name": "Updated Category Name",
  "image": "https://example.com/new-image.jpg"
}
```

#### Delete Category

```http
DELETE /api/v1/category/:id
```

## 🔐 Environment Variables

The following environment variables are used in this project:

| Variable      | Description                                      | Required | Default       |
| ------------- | ------------------------------------------------ | -------- | ------------- |
| `MONGODB_URI` | MongoDB connection string                        | Yes      | -             |
| `PORT`        | Server port number                               | No       | `5000`        |
| `NODE_ENV`    | Environment mode (`development` or `production`) | No       | `development` |

### Setting Up MongoDB Atlas

If you're using MongoDB Atlas (cloud database):

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs - development only)
5. Get your connection string from "Connect" → "Connect your application"
6. Replace `<password>` and `<database>` in the connection string

**Example connection string**:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mini-commerce?retryWrites=true&w=majority
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── connectDB.js          # MongoDB connection configuration
│   ├── modules/
│   │   ├── product/
│   │   │   ├── product.controller.js    # Product request handlers
│   │   │   ├── product.model.js         # Product database schema
│   │   │   ├── product.route.js          # Product API routes
│   │   │   ├── product.service.js        # Product business logic
│   │   │   ├── product.utils.js          # Product utility functions
│   │   │   └── product.validation.js    # Product validation schemas
│   │   └── category/
│   │       ├── category.controller.js   # Category request handlers
│   │       ├── category.model.js          # Category database schema
│   │       ├── category.route.js         # Category API routes
│   │       └── category.service.js       # Category business logic
│   ├── middlewares/
│   │   └── validateRequest.js    # Request validation middleware
│   └── utils/
│       ├── catchAsync.js         # Async error handler wrapper
│       ├── QueryBuilder.js       # Database query builder
│       └── sendResponse.js       # Standardized response formatter
├── server.js                      # Express app entry point
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🛠 Technologies Used

- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework for Node.js
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling for Node.js
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[CORS](https://github.com/expressjs/cors)** - Cross-Origin Resource Sharing middleware
- **[dotenv](https://github.com/motdotla/dotenv)** - Environment variable management

## 💻 Development

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload (requires nodemon)

### Development Workflow

1. Make changes to your code
2. The server will automatically restart if you're using `npm run dev`
3. Test your endpoints using:
   - Browser (for GET requests)
   - [Postman](https://www.postman.com/)
   - curl commands
   - Your frontend application

### Code Style

The project follows a modular architecture:

- **Controllers** handle HTTP requests and responses
- **Services** contain business logic
- **Models** define database schemas
- **Routes** define API endpoints
- **Validation** ensures data integrity
