const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes whitespace
    },
    mobile: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Ensures 10-digit mobile number
            },
            message: props => `${props.value} is not a valid 10-digit number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    address: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Supplier", supplierSchema);
