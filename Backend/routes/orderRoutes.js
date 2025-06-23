const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middlewares/authMiddleware');

// ✅ POST orders/create - Tạo hóa đơn mới
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { customer, items, total } = req.body;
    const userId = req.user.id; // từ middleware xác thực

    const newOrder = new Order({
      user: userId,
      customer,
      items,
      total
    });

    await newOrder.save();
    res.status(201).json({ message: "Đặt hàng thành công", orderId: newOrder._id });
  } catch (error) {
    console.error("Lỗi tạo đơn hàng: ", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});


// ✅ GET orders/all - Lấy tất cả đơn hàng (chỉ admin nên dùng)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "userCode name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy đơn hàng" });
  }
});


// ✅ GET orders/history - Lấy lịch sử mua hàng của người dùng đã đăng nhập
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Bạn chưa có đơn hàng nào." });
    }

    res.json(orders);
  } catch (error) {
    console.error("Lỗi lấy lịch sử đơn hàng: ", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// ✅ PUT /orders/update/:id - Cập nhật trạng thái đơn hàng
router.put("/update/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.json({ message: "Cập nhật trạng thái thành công", order: updatedOrder });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});


module.exports = router;
