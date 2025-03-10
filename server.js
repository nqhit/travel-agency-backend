const app = require("./src/app"); // Import the app from app.js

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});