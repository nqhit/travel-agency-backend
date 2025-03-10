const express = require("express");
const { applyCoupon } = require("../controllers/couponController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", protect, applyCoupon);

module.exports = router;
