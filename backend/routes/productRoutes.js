const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// @desc   Get all products
// @route  GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Get single product
// @route  GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc   Create a product
// @route  POST /api/products
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
