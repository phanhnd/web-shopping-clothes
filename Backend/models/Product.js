const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  amount: Number,
  description: String
});

module.exports = mongoose.model('Product', ProductSchema);

