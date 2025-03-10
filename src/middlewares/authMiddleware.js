const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware xác thực người dùng qua JWT
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Token không hợp lệ" });
    }
  } else {
    res.status(401).json({ message: "Không có token, truy cập bị từ chối" });
  }
};

// Middleware phân quyền Admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Truy cập bị từ chối, chỉ Admin được phép" });
  }
};

module.exports = { protect, admin };
