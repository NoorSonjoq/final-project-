// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { fullName, userName, email, phone, password } = req.body;

//   // التحقق من وجود الحقول المطلوبة
//   if (!fullName || !userName || !email || !phone || !password) {
//     return res.json({ success: false, message: "Please fill all required fields" });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.json({ success: false, message: "Email already exists" });

//     const newUser = new User({
//       fullName,
//       userName,
//       email,
//       phone,
//       password
//     });

//     await newUser.save();
//     res.json({ success: true, message: "User registered successfully" });
//   } catch (error) {
//     res.json({ success: false, message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.json({ success: false, message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.json({ success: false, message: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({ success: true, token });
//   } catch (error) {
//     res.json({ success: false, message: "Server error" });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserUtil = require('../helpers/UserUtil');
require('dotenv').config();

class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const userModel = new User();
        
        const user = (await userModel.whereMore({email}))?.[0];
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ email: user.email, role:user.role, id: user.id }, process.env.JWT_SECRET, { expiresIn: '2d' });
        await userModel.update(user.id, {lastLogin : new Date()})//update last login date to now 
        res.json({ token });
    }

    static async register(req, res) {
        // const {email, password, fullName, role, phone} = req.body;
        // const userModel = new User();
        // const userExists = (await userModel.whereMore({email}))?.[0];
        // if (userExists) return res.status(400).json({message: 'User already exists'});

        // const hashedPassword = await bcrypt.hash(password, 10);
        // await userModel.create({email, password: hashedPassword, fullName, role, phone})

        try{
            await UserUtil.createUser(req.body);        
            res.status(201).json({message: 'User registered successfully'});        
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}

module.exports = AuthController;
