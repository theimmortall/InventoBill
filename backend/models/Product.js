const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', CounterSchema);

async function getNextProductId() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "prod_id" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `PROD-${counter.seq}`;
}

const productSchema = new mongoose.Schema({
  prod_id: {
    type: String,
    required: true,
    unique: true,
  },
  prod_name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  supplier_name: {
    type: String,
    required: [true, "Please enter supplier name"],
    trim: true,
  },
  supplier_price: {
    type: Number,
    required: [true, "Please enter supplier price"],
  },
  sell_price: {
    type: Number,
    required: [true, "Please enter sell price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
  },
});

productSchema.pre("save", async function (next) {
  if (!this.prod_id) {
    this.prod_id = await getNextProductId();
  }
  next();
});


productSchema.index({ prod_id: 1 }, { unique: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;