const express = require("express");
const router = express.Router();
const Cart = require("../Models/Cart");
const protect = require("../middleware/authMiddleware");

// ============ CART দেখা ============
router.get("/", protect, async (req, res) => {
  try {
    // .populate() দিয়ে শুধু product ID না, পুরো product details নিয়ে আসা হচ্ছে
    let cart = await Cart.findOne({ user: req.userId }).populate("items.product");

    if (!cart) {
      cart = { items: [] }; // ইউজারের এখনো cart না থাকলে খালি পাঠানো
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ CART এ প্রোডাক্ট যোগ করা ============
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      // ইউজারের প্রথমবার cart বানানো হচ্ছে
      cart = new Cart({ user: req.userId, items: [{ product: productId, quantity }] });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity; // আগে থেকে থাকলে quantity বাড়ানো
      } else {
        cart.items.push({ product: productId, quantity }); // নতুন হলে যোগ করা
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ CART থেকে প্রোডাক্ট বাদ দেওয়া ============
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart পাওয়া যায়নি" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ============ QUANTITY আপডেট করা ============
router.put("/update", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart পাওয়া যায়নি" });
    }

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;