const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const app = express();
const userRouters = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes')
const authRouters = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('uploads')); // Serve ảnh


// Routes
app.use('/products',productRoutes);
app.use('/admin', userRouters);
app.use('/orders', orderRoutes);
app.use('/admin/auth', adminAuthRoutes);
app.use('/api/user', authRouters);

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shopDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.log('❌ MongoDB connection error:', err);
});

// Run server
app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
