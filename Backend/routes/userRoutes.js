const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Lấy danh sách người dùng (trừ password)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Loi khi lay danh sach nguoi dung '});
    }
});

//Xóa người dùng theo id 
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa người dùng' });
    } catch (err) {
        res.status(500).json({ error: 'Không thể xóa người dùng' });
    }
});

//Tìm kiếm người dùng theo tên
router.get("/search", async (req, res) => {
    try {
        const term = req.query.term || "";
        const regex = new RegExp(term.replace(/[^a-zA-Z0-9 ]/g, ""), "i");

        const Users = await User.find({
            name: { $regex: regex }
        });
        res.json(Users);
    } catch (error) {
        console.error("search error: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Loi khi lay thong tin nguoi dung"});
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {new: true}
    ).select('-password');
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: "Loi khi cap nhat thong tin nguoi dung" });
  }
});

module.exports = router;