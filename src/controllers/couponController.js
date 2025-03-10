const Coupon = require("../models/Coupon");

// Áp dụng mã giảm giá
const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });

    if (!coupon || new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: "Mã giảm giá không hợp lệ hoặc đã hết hạn" });
    }

    res.json({ discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { applyCoupon };
