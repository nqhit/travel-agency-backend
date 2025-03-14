const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");
// const couponRoutes = require("./routes/couponRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");
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
app.use("/auth", authRoutes);
// app.use("/orders", orderRoutes);
app.use("/products", productRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/reviews", reviewRoutes);
// app.use("/coupons", couponRoutes);
app.use("/categories", categoryRoutes);
// app.use("/wishlist", wishlistRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("JinStore API is running...");
});

// Error handling middleware
app.use(errorHandler);

// Export the app
module.exports = app;