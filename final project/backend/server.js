const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js'); 
require('dotenv').config();

 const authRoutes = require('./routes/authRoutes.js');
const productUserRoutes = require("./routes/productUserRoutes.js");
const cartUserRoutes = require("./routes/cartUserRoutes.js");
const orderUserRoutes = require('./routes/orderUserRoutes.js');
const productAdminRoutes = require('./routes/productAdminRoutes.js')
const orderAdminRoutes = require('./routes/orderAdminRoutes.js')
const reviewRoutes = require('./routes/reviewRoutes.js');

dotenv.config(); // تحميل متغيرات البيئة من ملف .env

const app = express();
app.use(express.json()); // تمكين التعامل مع JSON
app.use(cors());
// الاتصال بقاعدة البيانات وتشغيل السيرفر
connectDB();

// مسارات المشروع
app.use('/auth', authRoutes);
app.use('/productUser', productUserRoutes);
app.use('/cartUser', cartUserRoutes);
app.use('/orderUser', orderUserRoutes);
app.use('/productAdmin' , productAdminRoutes),
app.use('/orderAdmin', orderAdminRoutes)
app.use('/api/reviews', reviewRoutes);

// تشغيل الخادم
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
