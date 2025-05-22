const ReviewModel = require('../models/Review');
const reviewModel = new ReviewModel();

// إضافة تقييم جديد
exports.addReview = async (req, res) => {
  try {
    const { username, comment, rating } = req.body;

    // التحقق من القيم المطلوبة
    if (!username || !comment || !rating) {
      return res.status(400).json({ error: 'جميع الحقول مطلوبة' });
    }

    const review = await reviewModel.create({ username, comment, rating });

    res.status(201).json({ message: 'تم إضافة التقييم بنجاح', review });
  } catch (error) {
    console.error('فشل في إضافة التقييم:', error.message);
    res.status(500).json({ error: error.message }); // طباعة الخطأ الحقيقي
  }
};

// جلب كل التقييمات
exports.getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('فشل في جلب التقييمات:', error.message);
    res.status(500).json({ error: error.message});
  }
};