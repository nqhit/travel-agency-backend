const express = require("express");
const { createPayment, getPaymentByOrderId } = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createPayment);
router.get("/:orderId", protect, getPaymentByOrderId);


module.exports = router;
