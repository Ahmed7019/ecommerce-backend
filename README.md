# E-commerce Backend

This project is an e-commerce backend built using Express.js. It provides a robust and scalable API for managing products, orders, users, and other e-commerce functionalities.

## Features

- User authentication and authorization using OAuth
- Product management (CRUD operations)
- Order management (CRUD operations)
- Cart management
- Payment processing integration
- Error handling and validation

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize
- OAuth for authentication
- bcrypt for password hashing

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/e-commerce-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd e-commerce-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    OAUTH_CLIENT_ID=your_oauth_client_id
    OAUTH_CLIENT_SECRET=your_oauth_client_secret
    ```

## Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```

2. The server will be running on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a product by ID
- `PUT /api/products/:id` - Update a product by ID
- `DELETE /api/products/:id` - Delete a product by ID

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get an order by ID
- `PUT /api/orders/:id` - Update an order by ID
- `DELETE /api/orders/:id` - Delete an order by ID

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [your email address].
