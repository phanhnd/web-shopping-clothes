const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

//REGISTER 
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body; 

    const existingAdmin = await Admin.findOne({ username });
    if(existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error'});
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; 

    const admin = await Admin.findOne({ username });
    if(!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: 'admin'}, 'your_jwt_secret', {expiresIn: '1d'});

    res.json({ token, admin: {id: admin._id, username: admin.username}});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

//LOUGHT (client-side: chỉ cần xóa token phía client)
router.post('/logout', (req, res) => {
  localStorage.removeItem('token');

});

module.exports = router; 