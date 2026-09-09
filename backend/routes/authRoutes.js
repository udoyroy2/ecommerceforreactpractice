const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ইমেইল আগে থেকে আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট আছে" });
    }

    // পাসওয়ার্ড hash করা (plain text সেভ করা হয় না কখনো)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // JWT token বানানো
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // ৭ দিন পর token মেয়াদ শেষ
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

console.log("LOGIN REQUEST:", email);




    const user = await User.findOne({ email });
      console.log("USER FOUND:", user ? user.email : "NO USER");
    if (!user) {
      return res.status(400).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });
    }

    // hashed পাসওয়ার্ডের সাথে মিলিয়ে দেখা
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "ভুল ইমেইল বা পাসওয়ার্ড" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;