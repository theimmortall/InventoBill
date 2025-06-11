const InvoiceHeader = require('../models/InvoiceHeader');

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceHeader.find();
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching invoices', error: error.message });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = await InvoiceHeader.create(req.body);
    res.status(201).json({ success: true, message: "Invoice created", data: invoice });
  } catch (error) {
    // If it's a validation error, send 400, else 500
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ success: false, message: 'Error creating invoice', error: error.message });
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
