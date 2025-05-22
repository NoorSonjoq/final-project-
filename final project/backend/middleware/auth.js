// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// // تحميل المتغيرات من ملف .env
// dotenv.config();

// // middleware للتحقق من وجود JWT وتحقق منه
// const protect = (req, res, next) => {
//   // استخراج التوكن من رأس الطلب Authorization: Bearer <token>
//   // const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
//   //   ? req.headers.authorization.split(' ')[1] 
//   //   : null;
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   // التحقق من صحة التوكن باستخدام JWT_SECRET من المتغيرات البيئية
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     // إضافة بيانات المستخدم إلى الطلب (req.user)
//     req.user = decoded;
//     next(); // متابعة الطلب
//   });
// };

// // Middleware لحماية المسارات حسب الدور
// const adminProtect = (req, res, next) => {
//   // التأكد من أن المستخدم هو Admin
//   if (!(req.user && req.user.role === 'admin')) {    
//     return res.status(403).json({ message: 'Access denied: Admins only' });
//   }
//   next();
// };

// module.exports = { protect, adminProtect };

const jwt = require('jsonwebtoken');
const RoleEnum = require('../enums/RoleEnum');
require('dotenv').config();

const userAuth = function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded)
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'Invalid token' });
    }
};

const adminAuth = function (req, res, next) {
    const role = req.user.role;
    if(role && RoleEnum.ADMIN === role){
        next();
    } else{
        res.status(443).json({ message: 'Access Denail Admins only.' });
    }
};


module.exports = {userAuth, adminAuth}
