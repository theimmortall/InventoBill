const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
});

const InvoiceHeaderSchema = new mongoose.Schema({
  invoice_no: { type: String, unique: true }, // <-- match the index and make it unique
  date: Date,
  customerName: String,
  total: Number,
  status: String,
  items: [ItemSchema],
});

const InvoiceHeader = mongoose.models.InvoiceHeader || mongoose.model('InvoiceHeader', InvoiceHeaderSchema);

module.exports = InvoiceHeader;
