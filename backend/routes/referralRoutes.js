// backend/routes/referralRoutes.js
const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { protect } = require('../middlewares/protect');

// Define referral routes
router.route('/').get(protect, referralController.getAllReferrals).post(protect, referralController.createReferral);
router.route('/:id').get(protect, referralController.getReferralById).put(protect, referralController.updateReferral).delete(protect, referralController.deleteReferral);

module.exports = router;