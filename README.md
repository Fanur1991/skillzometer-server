# SKILLZOMETER - Server Side

Skillzometer is a platform designed for developers to easily evaluate their technical skills and showcase them effectively. This README focuses on the server-side implementation of the project.

## Technologies Used

### Backend Technologies

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **bcrypt**: Library for hashing passwords.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **crypto**: Node.js built-in module for cryptographic operations.
- **dotenv**: Module for loading environment variables from a .env file.
- **express-validator**: An express.js middleware for input validation and sanitization.
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT).
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **multer**: Middleware for handling multipart/form-data, used for uploading files.

### Development Tools

- **nodemon**: Utility that monitors for changes in files and automatically restarts the server.
- **concurrently**: Utility to run multiple commands concurrently.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Start the server: `npm run server`

## Available Scripts

- `npm run server`: Starts the server using nodemon for automatic restarts.
- `npm run dev`: Runs both the server and client concurrently in development mode.

## License

This project is licensed under the ISC License.

