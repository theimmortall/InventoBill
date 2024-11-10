const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(cors()); // Use CORS with default settings

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//Importing Routes
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const invoiceheaderRoutes = require("./routes/InvoiceHeaderRoutes");
const CustomerRoutes = require("./routes/CustomerRoutes");
const SupplierRoutes = require("./routes/SupplierRoutes");

app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", invoiceheaderRoutes);
app.use("/api", CustomerRoutes);
app.use("/api", SupplierRoutes);


module.exports = app;