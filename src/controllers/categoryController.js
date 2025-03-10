const Category = require("../models/Category");

// Lấy tất cả danh mục
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm danh mục mới (Admin)
const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const category = await Category.create({ name, description, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = { getCategories, createCategory };
