const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Importing Routes
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const invoiceheaderRoutes = require('./routes/InvoiceHeaderRoutes');
const CustomerRoutes = require("./routes/CustomerRoutes");
const SupplierRoutes = require("./routes/SupplierRoutes");
const PurchaseRoutes = require("./routes/PurchaseRoutes");
const alertRoutes = require('./routes/alert');

app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use('/api/invoiceheader', invoiceheaderRoutes);
app.use("/api", CustomerRoutes);
app.use("/api", SupplierRoutes);
app.use("/api", PurchaseRoutes);

app.use('/api/alert', alertRoutes);

module.exports = app;