const Payment = require("../models/Payment");
const Order = require("../models/Order");

// Tạo thanh toán mới
const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod, transactionId, amount } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    const payment = new Payment({
      order: orderId,
      user: req.user._id,
      paymentMethod,
      transactionId,
      amount,
      status: "paid",
    });

    await payment.save();
    order.isPaid = true;
    await order.save();

    res.status(201).json({ message: "Thanh toán thành công", payment });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy thông tin thanh toán theo ID đơn hàng
const getPaymentByOrderId = async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId });

    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ message: "Không tìm thấy thông tin thanh toán" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { createPayment, getPaymentByOrderId };
