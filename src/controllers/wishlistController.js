const Wishlist = require("../models/Wishlist");

// Lấy danh sách yêu thích của người dùng
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
    res.json(wishlist || { products: [] });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm sản phẩm vào danh sách yêu thích
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [productId] });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.json({ message: "Đã thêm vào danh sách yêu thích" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
      await wishlist.save();
    }

    res.json({ message: "Đã xóa khỏi danh sách yêu thích" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
