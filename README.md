## API Documentation
 [View API Documentation on Postman]
https://snehaghodke9575-9428252.postman.co/workspace/03fd6d22-ca62-478b-8a8f-9d1f77fee933/documentation/56146684-e524c308-cb2e-4815-8481-e1cef5c479e9


# E-commerce Backend API

A RESTful backend API for an e-commerce platform built with Node.js and Express. The application supports user and seller roles, authentication, product management, image uploads, cart functionality, order management, search and filtering, and containerized deployment using Docker.

## 1. Description

This project is a backend API for an e-commerce platform that provides separate functionality for customers and sellers.

Customers can browse and search products, manage their cart, and place orders. Sellers can add and manage products. The application uses JWT authentication and role-based authorization to protect resources and control access to different operations.

## 2. Features

* User registration and login
* JWT-based authentication
* Password hashing
* Role-based authorization
* User and seller roles
* Product creation and management
* Product image upload
* ImageKit integration
* Product search
* Product filtering
* Cart management
* Order creation
* Order status management
* Request validation
* Protected API routes
* MongoDB database integration
* RESTful API architecture
* Docker containerization
* AWS ECR container image deployment
* AWS ECS Fargate deployment

## 3. Tech Stack

| Technology                        
| Node.js :-  Backend runtime               
| Express.js :-REST API framework            
| MongoDB :-   Database                      
| Mongoose  :- MongoDB ODM                   
| JWT   :- Authentication                
| bcrypt/bcryptjs :- Password hashing              
| ImageKit :- Product image storage         
| express-validator :- Request validation            
| Postman :- API testing and documentation 
| Docker :- Containerization              
| AWS ECR :- Docker image registry         
| AWS ECS Fargate :Container deployment          

## 4. Authentication

The application uses JWT-based authentication.

### Authentication flow

1. A user registers with their credentials.
2. The password is hashed before being stored.
3. The user logs in with their credentials.
4. The server verifies the credentials.
5. A JWT is generated after successful authentication.
6. Protected routes require a valid JWT.
7. Authentication middleware verifies the token.
8. Authorization middleware checks the user's role before allowing restricted operations.

## 5. API Endpoints

The API is organized into resources such as authentication, users, products, cart, and orders.

### Authentication

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Register a user |
| POST   | `/api/auth/login`    | Login user      |

### Products

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/products/...` | Create a product  |
| GET    | `/api/products/...` | Retrieve products |
| PATCH  | `/api/products/...` | Update a product  |
| DELETE | `/api/products/...` | Delete a product  |

### Cart

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/api/cart/...` | Add/manage cart items |
| GET    | `/api/cart/...` | Retrieve cart         |
| PATCH  | `/api/cart/...` | Update cart           |
| DELETE | `/api/cart/...` | Remove cart items     |

### Orders

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/api/orders/...` | Create an order     |
| GET    | `/api/orders/...` | Retrieve orders     |
| PATCH  | `/api/orders/...` | Update order status |

> Complete endpoint details, request bodies, responses, and examples are available in the Postman API documentation.

## 6. ImageKit / Product Image Upload

ImageKit is used for product image storage and delivery.

The backend accepts product images, uploads them to ImageKit, and stores the resulting image URL with the product information in MongoDB.

This keeps media files separate from the application server while allowing the API to return accessible image URLs.

ImageKit credentials are stored in environment variables and are not included in the repository.

## 7. User / Seller Roles

The application uses role-based access control.

### User

Users can:

* Browse products
* Search and filter products
* Add products to their cart
* Update their cart
* Place orders
* View their orders

### Seller

Sellers have additional product-management permissions.

Sellers can:

* Create products
* Upload product images
* Update their products
* Delete their products
* Manage product information

Authorization middleware prevents users from accessing seller-only operations.

## 8. Search and Filtering

The product API supports product discovery through:

* Keyword-based search
* Product filtering
* Query-based product retrieval

These features allow clients to retrieve relevant products without requesting the complete product collection.

## 9. Request Validation

The API uses `express-validator` to validate incoming request data.

Validation is applied to relevant operations such as:

* User registration
* Login
* Product creation
* Product updates
* Other API requests requiring structured input

Invalid requests return appropriate validation errors instead of being processed.

## 10. How to Run Locally

### Prerequisites

Install:

* Node.js
* MongoDB or MongoDB Atlas
* Git
* ImageKit
* Docker (optional)

### Clone the repository

```bash
git clone <your-github-repository-url>
cd <project-folder>
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Replace the values with your own credentials.

### Start the server

```bash
npm run dev
```

or:

```bash
npm start
```

The API will be available at:

```text
http://localhost:5000
```

## 11. Docker

The project includes a `Dockerfile` for containerizing the backend application.

### Build the Docker image

```bash
docker build -t ecommerce-backend .
```

### Run the container

```bash
docker run -p 5000:5000 --env-file .env ecommerce-backend
```

The application will be available at:

```text
http://localhost:5000
```

Environment variables are supplied at runtime rather than being stored inside the Docker image.

## 12. AWS Deployment

The Docker image can be pushed to **Amazon ECR** and deployed using **Amazon ECS Fargate**.

Deployment flow:

```text
Node.js + Express Application
            ↓
        Dockerfile
            ↓
       Docker Image
            ↓
       Amazon ECR
            ↓
       Amazon ECS
            ↓
       Fargate Task
            ↓
      Running Backend
```

The application was containerized using Docker and the container image was deployed through AWS container services.

## API Documentation

The complete API documentation, including endpoints, request bodies, responses, and testing examples, is available in Postman.


## License

This project was developed as a backend learning and portfolio project.
