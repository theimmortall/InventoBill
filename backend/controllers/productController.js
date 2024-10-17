const Product = require("../models/Product");

// Feed product data
exports.insertProduct = async (req, res, next) => {
  try {
    const { name, price, totalStock } = req.body;

    // Ensure all required fields are provided
    if (!name || !price || totalStock === undefined) {
      return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    // Create a new product in the database
    const product = await Product.create({
      name,
      price,
      totalStock,
    });

    // Send a success response back to the client
    return res.status(201).json({
      success: true,
      message: "Product inserted successfully",
      product, // Return the newly created product details
    });
  } catch (error) {
    // Handle errors, e.g., database issues
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Get Product details
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id); // Use req.params.id to get the product ID from the URL

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    // Handle errors, e.g., invalid ID format
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
