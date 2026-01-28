const express = require('express');
const router = express.Router();

// Schedule interview (demo)
router.post('/schedule', (req, res) => {
  const { roomId, studentEmail, hrEmail, date } = req.body || {};
  res.json({ roomId, status: 'scheduled', date });
});

// Fetch interviews (demo)
router.get('/list', (req, res) => {
  res.json([
    { company: 'Google', date: '2026-09-18', status: 'Live', roomId: 'GOOG-123' },
    { company: 'Microsoft', date: '2026-09-25', status: 'Upcoming', roomId: 'MSFT-456' }
  ]);
});

module.exports = router;
