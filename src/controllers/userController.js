const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hàm tạo token JWT
const generateToken = (id, role) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("Thiếu JWT_SECRET trong môi trường.");
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra nếu thiếu thông tin
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    // Chuẩn hóa email
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
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra nếu thiếu email hoặc password
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu." });
    }

    // Chuẩn hóa email
    const normalizedEmail = email.toLowerCase().trim();

    // Tìm user theo email (lấy thêm mật khẩu để kiểm tra)
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản." });
    }

    // So sánh mật khẩu nhập vào với mật khẩu đã lưu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu." });
    }

    // Tạo token đăng nhập
    const token = generateToken(user._id, user.role);

    res.json({
      message: "Đăng nhập thành công!",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error("❌ Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};
