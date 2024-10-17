const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true, "Please enter product name: "],
        trim:true,
    },

    price :{
        type:Number,
        required:[true, "Please enter price of product: "],
    },

    totalStock :{
        type:Number,
        required:[true, "Please enter total stock: "],
    },                   
});
module.exports = mongoose.model("Product", productSchema);