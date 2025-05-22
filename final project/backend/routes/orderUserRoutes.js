const express = require('express');
const router = express.Router();
const orderUserController = require('../controller/orderUserController');
const { userAuth} = require('../middleware/auth');  // استيراد الميدلوير


// إضافة طلب جديد
router.post('/',userAuth, orderUserController.createOrder);

// حذف طلب معين
router.delete('/:id',userAuth, orderUserController.deleteOrder);

//  الحصول على كل الطلبات الخاصة باليوزر الحالي
router.get('/',userAuth, orderUserController.getUserOrders);

// الحصول على طلب معين 
router.get('/:id', userAuth, orderUserController.getOrderById);

module.exports = router;
