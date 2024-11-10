const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/supplierController");



// Chain routes for the same path
router.route("/supplier")
  .post(createSupplier)
  .get(getSuppliers);

router.route("/supplier/:id").delete(deleteSupplier);
router.route("/supplier/:id").put(updateSupplier);

module.exports = router;
