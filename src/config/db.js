const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("🔍 MONGO_URL từ process.env:", process.env.MONGO_URL); // Debug

  const MONGO_URL = process.env.MONGO_URL; // Kiểm tra tên biến

  if (!MONGO_URL) {
    console.error("❌ Không tìm thấy MONGO_URL! Vui lòng kiểm tra file .env.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL) 
      .then(() => console.log("MongoDB connected successfully"))
      .catch((err) => console.error("MongoDB connection error:", err));

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
