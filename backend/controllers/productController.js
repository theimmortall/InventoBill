const Product = require("../models/Product");

// Insert a new product
exports.insertProduct = async (req, res) => {
  try {
    const { prod_name, supplier_name, supplier_price, sell_price, quantity } = req.body;

    // Validate the fields
    if (!prod_name || !supplier_name || supplier_price === undefined || quantity === undefined ||sell_price===undefined) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const prod_id = `PROD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Insert product
    const product = await Product.create({
      prod_id,
      prod_name,
      supplier_name,
      supplier_price,
      sell_price,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Product inserted successfully",
      product, // Return product data in response
    });
  } catch (error) {
    console.error("Error during product insertion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error); // Log errors for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;  

    // Search by custom prod_id field
    const product = await Product.findOneAndDelete({ prod_id: productId });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update a product by prod_id
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; // `prod_id` from URL parameter
    const { prod_name, supplier_name, supplier_price, sell_price, quantity } = req.body;

    // Validate the fields
    if (!prod_name || !supplier_name || supplier_price === undefined || sell_price === undefined || quantity === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { prod_id: productId }, // Find the product by prod_id
      { prod_name, supplier_name, supplier_price, sell_price, quantity }, // Update fields
      { new: true, runValidators: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct, // Return updated product data
    });
  } catch (error) {
    console.error("Error updating product:", error); // Log errors for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

