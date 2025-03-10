const Product = require("../models/Product");

// Lấy tất cả sản phẩm
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy chi tiết sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, brand } = req.query;
    let filter = {};

    if (keyword) filter.name = { $regex: keyword, $options: "i" };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm sản phẩm (Chỉ Admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      brand,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật sản phẩm (Chỉ Admin)
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, brand, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.image = image || product.image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Xóa sản phẩm (Chỉ Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Sản phẩm đã được xóa" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getFilteredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
