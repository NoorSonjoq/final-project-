const express = require('express');
const router = express.Router();
const cartUserController = require('../controller/cartUserController');
const {userAuth} = require('../middleware/auth');

router.use(userAuth); // التحقق من التوكن

// إضافة منتج إلى السلة
router.post('/', cartUserController.addToCart);

// الحصول على سلة المستخدم بواسطة id
router.get('/:id', cartUserController.getCart);

// get all cart
router.get('/', cartUserController.getAllCarts);

// تحديث الكمية
router.put('/update', cartUserController.updateQuantity);

// حذف منتج من السلة
router.delete('/:userId/:productId', cartUserController.removeFromCart);


module.exports = router;