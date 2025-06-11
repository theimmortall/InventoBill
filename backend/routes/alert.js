const express = require('express');
const router = express.Router();

// Dummy data for demonstration
router.get('/', (req, res) => {
  res.json({
    alerts: [
      { id: 1, type: "low-stock", active: true },
      { id: 2, type: "overdue-invoice", active: true },
      { id: 3, type: "low-stock", active: false }
    ]
  });
});

module.exports = router;