// backend/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const unitController = require('../controllers/unitController');
const { protect, admin } = require('../middlewares/protect');

// Define unit routes
router.route('/').get(protect, unitController.getAllUnits).post(protect, admin, unitController.createUnit);
router.route('/:id').get(protect, unitController.getUnitById).put(protect, admin, unitController.updateUnit).delete(protect, admin, unitController.deleteUnit);

module.exports = router;