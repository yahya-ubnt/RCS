// backend/routes/commissionRoutes.js
const express = require('express');
const router = express.Router();
const commissionController = require('../controllers/commissionController');
const { protect, admin } = require('../middlewares/protect');

// Define commission routes
router.route('/').get(protect, commissionController.getAllCommissions).post(protect, admin, commissionController.createCommission);
router.route('/:id').get(protect, commissionController.getCommissionById).put(protect, admin, commissionController.updateCommission).delete(protect, admin, commissionController.deleteCommission);

module.exports = router;