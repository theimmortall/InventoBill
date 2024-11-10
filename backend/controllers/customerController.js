const mongoose = require("mongoose");
const Customer = require("../models/CustomerModel");


//Create Customer data
exports.createCustomer = async (req, res) => {
  try {
    const {name, mobile, email, address } = req.body;

    // Validate the fields
    if (!name || !mobile || !email || !address) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }


    // Insert Customer
    const customer = await Customer.create({
      name, mobile, email, address
    });

    return res.status(201).json({
      success: true,
      message: "Customer data inserted successfully",
      customer, 
    });
  } catch (error) {
    console.error("Error during customer data insertion:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error("Error fetching customers:", error); // Log errors for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    
    // Use findByIdAndDelete to avoid mismatch issues
    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    return res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// Update a customer by customerId
exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;  // Get the customer ID from the URL
    const { name, mobile, email, address } = req.body;  // Get data from the request body

    // Validate the fields
    if (!name || !mobile || !email || !address) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Update the customer using the customerId
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, mobile, email, address },  // Fields to be updated
      { new: true, runValidators: true }  // Return the updated customer
    );

    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer: updatedCustomer,  // Return updated customer data
    });
  } catch (error) {
    console.error("Error updating customer:", error);  // Log errors for debugging
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
