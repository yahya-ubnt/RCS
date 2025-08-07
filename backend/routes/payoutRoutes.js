// backend/routes/payoutRoutes.js
const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const { protect, admin } = require('../middlewares/protect');

// Define payout routes
router.route('/').get(protect, payoutController.getAllPayouts).post(protect, admin, payoutController.createPayout);
router.route('/:id').get(protect, payoutController.getPayoutById).put(protect, admin, payoutController.updatePayout).delete(protect, admin, payoutController.deletePayout);

module.exports = router;