const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Tạo token JWT
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Thiếu JWT_SECRET trong môi trường.");
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Đăng ký
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Kiểm tra confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp!" });
    }

    // Kiểm tra nếu thiếu thông tin
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Kiểm tra email đã tồn tại chưa
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    console.error("❌ Lỗi đăng ký:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

// Đăng nhập
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
