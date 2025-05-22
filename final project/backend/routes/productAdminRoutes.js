const express = require('express');
const router = express.Router();
const productAdminController = require('../controller/productAdminController')
const { userAuth , adminAuth} = require('../middleware/auth'); 


router.post('/', userAuth, adminAuth, productAdminController.createProduct);
router.put('/:id', userAuth, adminAuth, productAdminController.updateProduct);
router.delete('/:id', userAuth, adminAuth, productAdminController.deleteProduct);
// عرض كل المنتجات (متاح للأدمن أو أي مستخدم حسب ما ترغب)
router.get('/', userAuth, adminAuth, productAdminController.getAllProducts);
// عرض منتج معين بالـ ID
router.get('/:id', userAuth, adminAuth, productAdminController.getProductById);

module.exports = router;