const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('product'), (req, res) => {
  const imageUrl = `http://localhost:5000/images/${req.file.filename}`;
  res.json({ success: true, image_url: imageUrl });
});

// Add product
router.post('/addproduct', authMiddleware , async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//GET all products 
router.get('/allproducts', authMiddleware ,async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err){
        res.status(500).json({ message: 'Loi khi lay du lieu san pham'});
    }
});

// productRoutes.js
router.post('/removeproduct', authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Sản phẩm đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
  }
});

//search 
router.get("/search", authMiddleware, async (req, res) => {
  try {
    const term = req.query.term || "";
    const regex = new RegExp(term.replace(/[^a-zA-Z0-9 ]/g, ""), "i");

    const Products = await Product.find({
      name: { $regex: regex }
    });
    res.json(Products);
  } catch(error) {
    console.error("search error: ", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//lay san pham theo danh muc
router.get('/category/:category' , async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category.toLowerCase() });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Loi khi lay san pham"})
  }
});

//Lay chi tiet san pham theo id
// Lấy chi tiết sản phẩm theo ID
router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err.message });
  }
});

router.get("/orders", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});


module.exports = router;
