const mongoose = require('mongoose');

// Helper function to generate a random invoice number
function generateInvoiceNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  return `INV${randomNumber}`;
}

const invoiceHeaderSchema = new mongoose.Schema({
  invoice_no: {
    type: String,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  to: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  CGST: {
    type: Number,
    required: true,
  },
  SGST: {
    type: Number,
    required: true,
  },
  IGST: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending',
  }
});

// Pre-save middleware to generate a unique invoice number if not set
invoiceHeaderSchema.pre('save', async function (next) {
  if (!this.invoice_no) {
    let newInvoiceNo;
    let invoiceExists = true;

    // Generate and check for unique invoice number
    while (invoiceExists) {
      newInvoiceNo = generateInvoiceNumber();
      // Check if the generated invoice number already exists
      const existingInvoice = await mongoose.models.InvoiceHeader.findOne({ invoice_no: newInvoiceNo });
      if (!existingInvoice) {
        invoiceExists = false;
      }
    }

    // Assign the unique invoice number to the document
    this.invoice_no = newInvoiceNo;
  }
  next();
});

module.exports = mongoose.model('InvoiceHeader', invoiceHeaderSchema);
