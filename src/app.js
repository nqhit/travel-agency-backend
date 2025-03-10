const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const couponRoutes = require("./routes/couponRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const logger = require("./config/logger");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Cho phép xử lý form data

// CORS configuration
const corsOptions = {
  origin: "*", // Change this to your frontend URL in production
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Define routes
app.use("/JinStore/auth", authRoutes);
app.use("/JinStore/orders", orderRoutes);
app.use("/JinStore/products", productRoutes);
app.use("/JinStore/payments", paymentRoutes);
app.use("/JinStore/reviews", reviewRoutes);
app.use("/JinStore/coupons", couponRoutes);
app.use("/JinStore/categories", categoryRoutes);
app.use("/JinStore/wishlist", wishlistRoutes);

// Health check route
app.get("/JinStore", (req, res) => {
  res.send("JinStore API is running...");
});

// Error handling middleware
app.use(errorHandler);

// Export the app
module.exports = app;