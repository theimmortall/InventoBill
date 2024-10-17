const express = require("express");
const {
  insertProduct,
  getProductDetails
} = require("../controllers/productController");
const { isAuthenticatedUser} = require("../middleware/auth");
const router = express.Router();

router.route("/insertProd").post(isAuthenticatedUser, insertProduct);
router.route("/getProd/:id").get(isAuthenticatedUser, getProductDetails);


module.exports = router;