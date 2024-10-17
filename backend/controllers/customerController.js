const CustomerModel = require("../models/CustomerModel");

//Create Customer data
exports.createCustomer = async(req, res) =>{
    try{
        const customer = new CustomerModel(req.body);
        await customer.save();
        res.status(201).json({
            success: true,
            message: 'Customer data added',
            data: customer,
          });
    }catch(error){
        res.status(400).json({
            success:false,
            message: 'Error while adding customer data',
            error:error.message,
        });
    }
};

//getting all customer details
exports.getCustomerDetails = async(req,res) =>{
    try {
        const customers = await CustomerModel.find();
        res.status(200).json({
          success: true,
          data: customers,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Error fetching customers data',
          error: error.message,
        });
      }
};

// Get a single customer data by ID
exports.getCustomerById = async (req, res) => {
    try {
      const customer3 = await CustomerModel.findById(req.params.id);
      if (!customer3) {
        return res.status(404).json({
          success: false,
          message: 'Customer data not found',
        });
      }
      res.status(200).json({
        success: true,
        data: customer3,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching Customer data',
        error: error.message,
      });
    }
  };
  
  // Update an customer data by ID
  exports.updateCustomer = async (req, res) => {
    try {
      const customer2 = await CustomerModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      });
  
      if (!customer2) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Customer data updated successfully',
        data: customer2,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating customer data',
        error: error.message,
      });
    }
  };
  
  // Delete an customer data by ID
  exports.deleteCustomer = async (req, res) => {
    try {
      const customer1 = await CustomerModel.findByIdAndDelete(req.params.id);
  
      if (!customer1) {
        return res.status(404).json({
          success: false,
          message: 'Customer data not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Customer data deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting customer data',
        error: error.message,
      });
    }
  };
  