const express = require("express");
const router = express.Router();

const Product = require("../Models/Product");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

// =====================================================
// GET ALL PRODUCTS
// Optional: category + search filter
// =====================================================

router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    if (category) {
      filter.categories = category;
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (err) {
    console.error("Get Products Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    console.error("Get Single Product Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// =====================================================
// ADD NEW PRODUCT
// ADMIN ONLY
// IMAGE → MULTER → CLOUDINARY → MONGODB
// =====================================================

router.post(
  "/",
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      // Check image
      if (!req.file) {
        return res.status(400).json({
          message: "Product image is required",
        });
      }

      // Upload image to Cloudinary
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "shopora/products",
        },

        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);

            return res.status(500).json({
              message: "Image upload failed",
            });
          }

          try {
            // Create product
            const newProduct = new Product({
              name: req.body.name,

              categories: JSON.parse(req.body.categories),

              price: req.body.price,

              oldPrice: req.body.oldPrice,

              discount: Number(req.body.discount) || 0,

              rating: Number(req.body.rating) || 0,

              stock: Number(req.body.stock) || 0,

              // Cloudinary URL
              image: result.secure_url,
            });

            const savedProduct = await newProduct.save();

            res.status(201).json(savedProduct);
          } catch (err) {
            console.error("Save Product Error:", err);

            res.status(400).json({
              message: err.message,
            });
          }
        }
      );

      // Send image buffer to Cloudinary
      uploadStream.end(req.file.buffer);
    } catch (err) {
      console.error("Add Product Error:", err);

      res.status(500).json({
        message: err.message,
      });
    }
  }
);

// =====================================================
// UPDATE PRODUCT
// ADMIN ONLY
//
// Image selected:
//    New image → Cloudinary → update image
//
// Image not selected:
//    Keep old image
// =====================================================

router.put(
  "/:id",
  adminOnly,
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          message: "Product পাওয়া যায়নি",
        });
      }

      // Basic product information
      product.name = req.body.name;

      product.categories = JSON.parse(req.body.categories);

      product.price = req.body.price;

      product.oldPrice = req.body.oldPrice;

      product.discount = Number(req.body.discount) || 0;

      product.rating = Number(req.body.rating) || 0;

      product.stock = Number(req.body.stock) || 0;

      // =================================================
      // If new image selected
      // =================================================

      if (req.file) {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "shopora/products",
          },

          async (error, result) => {
            if (error) {
              console.error(
                "Cloudinary Update Image Error:",
                error
              );

              return res.status(500).json({
                message: "Image upload failed",
              });
            }

            try {
              // Replace old image URL
              product.image = result.secure_url;

              const updatedProduct = await product.save();

              res.json(updatedProduct);
            } catch (err) {
              console.error(
                "Update Product Save Error:",
                err
              );

              res.status(400).json({
                message: err.message,
              });
            }
          }
        );

        uploadStream.end(req.file.buffer);
      }

      // =================================================
      // No new image
      // Keep old image
      // =================================================

      else {
        const updatedProduct = await product.save();

        res.json(updatedProduct);
      }
    } catch (err) {
      console.error("Update Product Error:", err);

      res.status(400).json({
        message: err.message,
      });
    }
  }
);

// =====================================================
// DELETE PRODUCT
// ADMIN ONLY
// =====================================================

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product পাওয়া যায়নি",
      });
    }

    res.json({
      message: "Product ডিলিট হয়েছে",
    });
  } catch (err) {
    console.error("Delete Product Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;