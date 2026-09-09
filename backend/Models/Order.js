const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },

  product: {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: String,
    image: String,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },

 paymentStatus: {           // 🆕 NEW
    type: String,
    enum: ["Unpaid", "Paid", "Failed"],
    default: "Unpaid",
  },

  transactionId: {           // 🆕 NEW: SSLCommerz এর নিজস্ব transaction ID
    type: String,
  },

}, 

{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);