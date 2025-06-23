const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  quantity: Number,
  price: Number,
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  note: String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  customer: customerSchema,   
  items: [itemSchema],
  total: Number,
  status: {
    type: String, 
    enum: ["pending", "confirmed", "shipped", "cancelled"],
    default: "pending",
  },
  createdAt: {                   
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema); 
