const InvoiceHeader = require('../models/InvoiceHeader');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = new InvoiceHeader(req.body);
    await invoice.save();
    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating invoice',
      error: error.message,
    });
  }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceHeader.find();
    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoices',
      error: error.message,
    });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }
    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching invoice',
      error: error.message,
    });
  }
};

// Update an invoice by ID
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating invoice',
      error: error.message,
    });
  }
};

// Delete an invoice by ID
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting invoice',
      error: error.message,
    });
  }
};
