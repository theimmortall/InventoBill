const express = require('express');
const router = express.Router();
const invheaderController = require('../controllers/invheaderController');

router.get('/', invheaderController.getAllInvoices);
router.post('/', invheaderController.createInvoice);

module.exports = router;
