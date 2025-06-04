const mongoose = require("mongoose");
const Purchase = require("../models/PurchaseModel");

exports.createPurchase = async (req, res) => {
  try {
    const { invoice_no, supplier_name, purchase_date, total_amount } = req.body;

    // Validate the fields
    if (!invoice_no || !supplier_name || !purchase_date || !total_amount) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Insert Purchase
    const purchase = await Purchase.create({
      invoice_no, supplier_name, purchase_date, total_amount
    });

    return res.status(201).json({
      success: true,
      message: "Purchase data inserted successfully",
      purchase,
    });
  } catch (error) {
    console.error("Error during purchase data insertion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all purchases
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    return res.status(200).json({ success: true, purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;

    const purchase = await Purchase.findByIdAndDelete(purchaseId);

    if (!purchase) {
      return res.status(404).json({ success: false, message: 'Purchase not found' });
    }

    return res.status(200).json({ success: true, message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

  // Update a product by prod_id
  exports.updatePurchase = async (req, res) => {
    try {
      const purchaseId = req.params.id;  
      const { invoice_no, supplier_name, purchase_date, total_amount } = req.body;  
  
      // Validate the fields
      if (!invoice_no || !supplier_name || !purchase_date || !total_amount) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
  
    
      const updatedPurchase = await Purchase.findByIdAndUpdate(
        purchaseId,
        { invoice_no, supplier_name, purchase_date, total_amount }, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedPurchase) {
        return res.status(404).json({ success: false, message: "Purchase not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: "Purchase updated successfully",
        purchase: updatedPurchase, 
      });
    } catch (error) {
      console.error("Error updating purchase:", error); // Log errors for debugging
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  