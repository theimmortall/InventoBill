
const express = require("express");
const router = express.Router();
const {
  insertProduct,
  getProducts,      // Fetch all products function
  deleteProduct ,
  updateProduct,    // Delete a product function
} = require("../controllers/productController");

router.route("/product").post(insertProduct);
// GET route for fetching all products - Change to '/product' to match the frontend API call
router.route("/product").get(getProducts);

router.route("/product/:id").delete(deleteProduct);
router.route("/product/:id").put(updateProduct);
module.exports = router;
