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
    },
    total_amount: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
