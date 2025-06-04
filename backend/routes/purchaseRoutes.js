const express = require("express");
const router = express.Router();
const {
  createPurchase,
  getPurchases,
  deletePurchase,
  updatePurchase,
} = require("../controllers/purchaseController");

router.route("/purchase")
  .post(createPurchase)
  .get(getPurchases);

router.route("/purchase/:id").delete(deletePurchase);
router.route("/purchase/:id").put(updatePurchase);

module.exports = router;