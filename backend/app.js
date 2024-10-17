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
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const invoiceheaderRoutes = require("./routes/InvoiceHeaderRoutes");
const CustomerRoutes = require("./routes/CustomerRoutes");

app.use("/api/p1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/h1", invoiceheaderRoutes);
app.use("/api/c1", CustomerRoutes);


module.exports = app;