const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userCode: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], default: '' },
  birthday: { type: Date },
  historyShopping: { type: [String], default: [] }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
