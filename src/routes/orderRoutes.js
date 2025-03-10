const express = require("express");
const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, getOrders);
router.get("/:id", protect, getOrderById);
router.get("/", protect, admin, getOrders);
router.put("/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);


module.exports = router;
