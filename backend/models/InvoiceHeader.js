const mongoose = require('mongoose');

// Counter model for sequence tracking
const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 }
});

// Check if the model exists before defining it to avoid OverwriteModelError
const Counter = mongoose.models.Counter || mongoose.model('Counter', CounterSchema);

// Helper to get next invoice number
async function getNextInvoiceNumber() {
  const counter = await Counter.findByIdAndUpdate(
    'invoice_no', { $inc: { seq: 1 } }, { new: true, upsert: true }
  );
  return `INV${counter.seq.toString().padStart(6, '0')}`;
}

// Invoice Header schema
const invoiceHeaderSchema = new mongoose.Schema({
  invoice_no: { type: String, unique: true },
  date: { type: Date, required: true, default: Date.now },
  to: { type: String, required: true },
  total_amount: { type: Number, required: true },
  CGST: { type: Number, required: true },
  SGST: { type: Number, required: true },
  IGST: { type: Number, required: true },
  payment_status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending',
    required: true
  }
});

// Pre-save middleware for invoice number generation
invoiceHeaderSchema.pre('save', async function (next) {
  if (!this.invoice_no) {
    this.invoice_no = await getNextInvoiceNumber();
  }
  next();
});

// Check if the model already exists before defining it
const InvoiceHeader = mongoose.models.InvoiceHeader || mongoose.model('InvoiceHeader', invoiceHeaderSchema);

module.exports = InvoiceHeader;
