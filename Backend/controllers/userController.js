const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_jwt_secret";

exports.register = async (req, res) => {
  const { name, email, password } = req.body; 
  try {
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ msg: "Email đã tồn tại" });

    const hashed = await bcrypt.hash(password, 10);
    const userCode = "U" + Date.now(); // Tạo mã người dùng

    const newUser = await User.create({ userCode, name, email, password: hashed });
    res.status(201).json({ msg: "Đăng ký thành công", user: newUser });
  } catch (err) {
    console.error("Lỗi đăng ký:", err);
    res.status(500).json({ msg: "Lỗi server", error: err.message });
  }
};


//Dang nhap 
exports.login = async (req, res) => {
  const {email, password} = req.body; 
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: "Email khong ton tai!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: "Sai mat khau" });

    const token = jwt.sign({ id: user._id, role: user.role}, JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ msg: 'Dang nhap thanh cong', token, user});
  } catch (err) {
    res.status(500).json({ msg: "Loi server", error: err.message});
  }
};