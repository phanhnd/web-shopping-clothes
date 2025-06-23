// const Product = require('../models/Product');

// exports.addProduct = async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.json({ success: true, message: 'Product added successfully' });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// exports.getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     await Product.findByIdAndDelete(id);
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };
