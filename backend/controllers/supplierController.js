const mongoose = require("mongoose");
const Supplier = require("../models/SupplierModel");

// Create Supplier data
exports.createSupplier = async (req, res) => {
  try {
    const { name, mobile, email, address } = req.body;

    // Validate the fields
    if (!name || !mobile || !email || !address) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Insert Supplier
    const supplier = await Supplier.create({
      name, mobile, email, address
    });

    return res.status(201).json({
      success: true,
      message: "Supplier data inserted successfully",
      supplier,
    });
  } catch (error) {
    console.error("Error during supplier data insertion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json({ success: true, suppliers });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;

    // Use findByIdAndDelete to avoid mismatch issues
    const supplier = await Supplier.findByIdAndDelete(supplierId);

    if (!supplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found' });
    }

    return res.status(200).json({ success: true, message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

  // Update a product by prod_id
  exports.updateSupplier = async (req, res) => {
    try {
      const supplierId = req.params.id;  // Get the supplier ID from the URL
      const { name, mobile, email, address } = req.body;  // Get data from the request body
  
      // Validate the fields
      if (!name || !mobile || !email || !address) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
  
    
      const updatedSupplier = await Supplier.findByIdAndUpdate(
        supplierId,
        { name, mobile, email, address }, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedSupplier) {
        return res.status(404).json({ success: false, message: "Supplier not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Supplier updated successfully",
        supplier: updatedSupplier, // Return updated supplier data
      });
    } catch (error) {
      console.error("Error updating supplier:", error); // Log errors for debugging
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  