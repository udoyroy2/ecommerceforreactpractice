const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {                    // 🆕 NEW
    type: String,
    enum: ["customer", "admin"],
    default: "customer",     // ডিফল্ট সবাই customer
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);