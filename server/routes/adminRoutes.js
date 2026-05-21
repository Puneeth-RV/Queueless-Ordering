const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.route('/stats').get(protect, admin, getStats);

module.exports = router;
