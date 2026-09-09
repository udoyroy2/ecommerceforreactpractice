const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");

// নতুন অর্ডার তৈরি করা
router.post("/", async (req, res) => {
  try {
    const { customerInfo, product, quantity } = req.body;

    const newOrder = new Order({
      customerInfo,
      product,
      quantity,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// একটা নির্দিষ্ট অর্ডার দেখা
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order পাওয়া যায়নি" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;