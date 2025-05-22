const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  // المستخدم الذي يمتلك السلة
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // ربط السلة بنموذج User
    required: true,
  },
  // المنتجات الموجودة في السلة
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',  // ربط المنتج بنموذج Product
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,  // إذا لم يتم تحديد الكمية، ستكون 1
    },
  }],
});

module.exports = cartSchema;