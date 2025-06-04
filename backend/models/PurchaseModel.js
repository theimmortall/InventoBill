const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    invoice_no: {
        type: String,
        required: true,
    },
    supplier_name: {
        type: String,
        required: true,
    },
    purchase_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
