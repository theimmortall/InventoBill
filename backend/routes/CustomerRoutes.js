const express = require("express");
const {
  createCustomer,
  getCustomers,      
  deleteCustomer,
  updateCustomer    
} = require("../controllers/customerController");

const router = express.Router();

// Chain routes for the same path
router.route("/customer")
  .post(createCustomer)
  .get(getCustomers);

router.route("/customer/:id").delete(deleteCustomer);
router.route("/customer/:id").put(updateCustomer);

module.exports = router;
