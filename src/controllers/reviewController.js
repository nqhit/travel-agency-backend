const Review = require("../models/Review");

// Thêm đánh giá
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const review = new Review({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Đánh giá đã được thêm" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa đánh giá (Chỉ Admin)
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Đánh giá đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { addReview, deleteReview };
