const Cart = require('../models/Cart');
const Product = require('../models/Product');

// إضافة منتج إلى السلة
exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // التأكد من وجود المنتج
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // إضافة المنتج إلى السلة
    const cart = await Cart.findOne({ userId });
    if (cart) {
      // إذا كانت السلة موجودة، نحدثها
      const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;  // زيادة الكمية
      } else {
        cart.products.push({ productId, quantity });
      }
      cart.updatedAt = Date.now();  // تحديث تاريخ آخر تعديل
      await cart.save();
      return res.status(200).json({ success: true, message: 'Product added to cart', cart });
    } else {
      // إذا لم تكن السلة موجودة، ننشئ سلة جديدة
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      await newCart.save();
      return res.status(200).json({ success: true, message: 'Cart created and product added', cart: newCart });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// الحصول على جميع السلات
exports.getAllCarts = async (req, res) => {
    try {
    const userId = req.user.id; // جاي من الميدلوير تبع الحماية
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error retrieving user cart:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// الحصول على سلة المستخدم
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('products.productId', 'name price');

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to get cart." });
  }
};

// تحديث الكمية في السلة
exports.updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;  // تحديث الكمية
        cart.updatedAt = Date.now();  // تحديث تاريخ آخر تعديل
        await cart.save();
        return res.status(200).json({ success: true, message: 'Quantity updated', cart });
      } else {
        return res.status(404).json({ success: false, message: 'Product not found in cart' });
      }
    } else {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// حذف منتج من السلة
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // إزالة المنتج من السلة
    const originalLength = cart.products.length;
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);

    if (cart.products.length === originalLength) {
      return res.status(404).json({ success: false, message: 'Product not found in cart' });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ success: true, message: 'Product removed from cart', cart });

  } catch (error) {
    console.error('Error removing product from cart:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
