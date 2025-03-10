const express = require("express");
const {
  getProducts,
  getProductById,
  getFilteredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/search", getFilteredProducts);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);


module.exports = router;
