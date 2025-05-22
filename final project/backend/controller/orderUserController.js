const Order = require('../models/Order');
const Product = require('../models/Product');

// إنشاء طلب جديد مع حساب التوتال تلقائيًا
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, paymentMethod } = req.body;

    if (!userId || !products || products.length === 0 || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    // حساب التوتال بناءً على الأسعار
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.productId}` });
      }
      totalAmount += product.price * item.quantity;
    }

    const newOrder = new Order({
      userId,
      products,
      paymentMethod,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create order." });
  }
};


// الحصول على طلب معين باستخدام الـ ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id })
      .populate('products.productId', 'name price');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching user order:', error);
    res.status(500).json({ success: false, message: 'Failed to get order' });
  }
};

// عرض جميع الطلبات الخاصة باليوزر
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('products.productId', 'name price');

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Failed to get user orders' });
  }
};

// حذف طلب
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete order." });
  }
};
