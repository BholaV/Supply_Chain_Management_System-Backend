import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import UserRouter from './Routes/UserRoute.js';
import SupplierRouter from './Routes/SupplierRoute.js';
import ProductRoute from './Routes/ProductRoute.js';
import OrderRoute from './Routes/OrderRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Route handling
app.use("/user", UserRouter); // Route for user-related endpoints
app.use("/supplier", SupplierRouter); // Route for supplier-related endpoints
app.use("/product", ProductRoute); // Route for product-related endpoints
app.use("/order", OrderRoute); // Route for order-related endpoints

// Database connection and server startup
const link = process.env.CONNECTION_LINK; // MongoDB connection string
mongoose.connect(link)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3001, () => {
            console.log("Server started...");
        });
    })
    .catch(err => {
        console.log(err);
    });
