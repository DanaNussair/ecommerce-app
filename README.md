# E-commerce App

This is a microservices-based e-commerce application. The application consists of three main microservices: Order, Product, and Main (User and Auth). 

*Note: So far the order/product microservices communite but not the main*

## Getting Started
This app was built using NestJS.

### Prerequisites
- Yarn, Node.js, PostgreSQL, NestJS.

### Installation
1. Navigate to the app directory
    ```sh
    yarn install
    ```
2. Start the `main` microservice:
    ```sh
    yarn start:dev
    ```
3. Start the `product` microservice:
    ```sh
    yarn start:dev product
    ```
4. Start the `order` microservice:
    ```sh
    yarn start:dev order
    ```

## Usage
- To access the main endpoints navigate to `localhost:3001`
- To access the product endpoints navigate to `localhost:3002`
- To access the order endpoints navigate to `localhost:3003`

## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

*Note: in the development of this project I used `Neon` for an easier postgres setup*

```env
# Database configuration
DATABASE_URL=<YOUR_DATABASE_URL>

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret
```

## Microservices

### 1. Order Service
- **Description**: Manages customer orders.
- **Endpoints**:
-
  - `GET /orders`: Retrieve all order details.
  - `GET /orders/{id}`: Retrieve order details by ID.
  - `POST /orders`: Create a new order.
  - `PUT /orders/{id}`: Update an existing order.
  - `DELETE /orders/{id}`: Delete an order.
---
- 
  - `POST /items`: Add a new item.
  - `GET /items`: Retrieve all item details.
  - `DELETE /items/{id}`: Delete an item.

### 2. Product Service
- **Description**: Manages products available for purchase.
- *This service also has GRPC methods for all methods*
- **Endpoints**:
  - `POST /products`: Add a new product.
  - `GET /products/{id}`: Retrieve product details by ID.
  - `GET /products`: Retrieve all products.
  - `PUT /products/{id}`: Update an existing product.
  - `DELETE /products/{id}`: Delete a product.

### 3. Main Service (User and Auth)
- **Description**: Manages user accounts and authentication.
- **Endpoints**:
  - `GET /users`: Retrieve all users' details.
  - `GET /users/{id}`: Retrieve user details by ID.
  - `POST /users`: Register a new user.
  - `POST /auth/signin`: Authenticate a user.

## Contact
- **Author**: Dana Alnusair
- **Email**: dana.alnusair@gmail.com
