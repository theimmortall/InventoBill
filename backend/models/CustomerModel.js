const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please customer name:"]
    },

    mobile:{
        type:Number,
        required:[true, "Please enter mobile number:"]
    },
    email:{
        type:String,
        required:[true, "Please enter your email address"]
    },

    customer_address:{
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, require: true },
        pinCode: { type: Number, required: true },
        country: { type: String, required: true },
        phoneNo: { type: Number, required: true },

    }
});

module.exports = mongoose.model("Customer", customerSchema);