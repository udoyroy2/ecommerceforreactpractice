const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const products = [
  {
    name: "Classic Cotton Shirt",
    categories: ["Men", "Full Sleeve"],
    price: "29.99",
    oldPrice: "39.99",
    discount: 25,
    rating: 48,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Graphic T-Shirt",
    categories: ["Men", "Half Sleeve"],
    price: "1080tk",
    oldPrice: "1000tk",
    discount: 5,
    rating: 55,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Relaxed Fit Pant",
    categories: ["Men", "Pant"],
    price: "34.99",
    oldPrice: "44.99",
    discount: 22,
    rating: 35,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Oversized Hoodie",
    categories: ["Men", "Full Sleeve", "Winter Collection"],
    price: "49.99",
    oldPrice: "64.99",
    discount: 23,
    rating: 72,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Urban Running Shoes",
    categories: ["Men", "Shoes"],
    price: "69.99",
    oldPrice: "89.99",
    discount: 22,
    rating: 96,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Floral Summer Dress",
    categories: ["Women"],
    price: "39.99",
    oldPrice: "54.99",
    discount: 27,
    rating: 60,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({}); // পুরোনো ডেটা মুছে ফেলবে (fresh start)
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
};

seedDB();