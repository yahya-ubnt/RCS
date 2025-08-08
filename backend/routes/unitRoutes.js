// backend/routes/unitRoutes.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const unitController = require('../controllers/unitController');
const { protect, admin } = require('../middlewares/protect');

// Define unit routes
router.route('/').get(unitController.getAllUnits).post(protect, admin, unitController.createUnit);
router.route('/:unitId').get(unitController.getUnitById).put(protect, admin, unitController.updateUnit).delete(protect, admin, unitController.deleteUnit);

module.exports = router;