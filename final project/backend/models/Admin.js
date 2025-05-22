// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   fullName: String,
//   userName: String,
//   password: { type: String, required: true },
//   phone: String,
//   createAt: { type: Date, default: Date.now },
//   lastLogin: { type: Date, default: null },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' }, // لدور المستخدم: user أو admin
// });

// // تشفير كلمة المرور
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // مقارنة كلمة المرور
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

// // تحديث المستخدم مع دور (Admin) أو (User)
// userSchema.statics.updateUserWithRole = function (id, email, fullName, userName, phone, password, role, callback) {
//   const updateData = {
//     email,
//     fullName,
//     userName,
//     phone,
//     role,
//   };

//   if (password) {
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) return callback(err);
//       updateData.password = hashedPassword;
//       this.findByIdAndUpdate(id, updateData, callback);
//     });
//   } else {
//     this.findByIdAndUpdate(id, updateData, callback);
//   }
// };

// // حذف المستخدم
// userSchema.statics.deleteUser = function (id, callback) {
//   this.findByIdAndDelete(id, callback);
// };

// // تحويل المستخدم إلى مسؤول (admin)
// userSchema.statics.updateUserToAdmin = function (id, callback) {
//   this.findByIdAndUpdate(id, { role: 'admin' }, { new: true }, callback);
// };

// module.exports = mongoose.model('User', userSchema);

const User = require('../schemas/UserSchema');
const BaseModel = require("./BaseModel");

class AdminUserModel extends BaseModel {
    constructor() {
        super(User);
    }

}

module.exports = AdminUserModel;