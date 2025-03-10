const Order = require("../models/Order");

// Lấy danh sách tất cả đơn hàng (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Không có sản phẩm trong đơn hàng" });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = req.body.isPaid || order.isPaid;
      order.isDelivered = req.body.isDelivered || order.isDelivered;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: "Đơn hàng đã được xóa" });
    } else {
      res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
