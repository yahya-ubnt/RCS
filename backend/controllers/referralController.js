// backend/controllers/referralController.js
const Referral = require('../models/Referral');

// @desc    Get all referrals
// @route   GET /api/referrals
// @access  Private
exports.getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({}).populate('agent');
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single referral by ID
// @route   GET /api/referrals/:id
// @access  Private
exports.getReferralById = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id).populate('agent');
    if (referral) {
      res.status(200).json(referral);
    } else {
      res.status(404).json({ message: 'Referral not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new referral
// @route   POST /api/referrals
// @access  Private
exports.createReferral = async (req, res) => {
  const { agent, referredName, referredContact, status } = req.body;

  try {
    const referral = await Referral.create({
      agent,
      referredName,
      referredContact,
      status,
    });

    if (referral) {
      res.status(201).json(referral);
    } else {
      res.status(400).json({ message: 'Invalid referral data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a referral
// @route   PUT /api/referrals/:id
// @access  Private
exports.updateReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (referral) {
      referral.agent = req.body.agent || referral.agent;
      referral.referredName = req.body.referredName || referral.referredName;
      referral.referredContact = req.body.referredContact || referral.referredContact;
      referral.status = req.body.status || referral.status;

      const updatedReferral = await referral.save();
      res.status(200).json(updatedReferral);
    } else {
      res.status(404).json({ message: 'Referral not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a referral
// @route   DELETE /api/referrals/:id
// @access  Private
exports.deleteReferral = async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);

    if (referral) {
      await referral.deleteOne();
      res.status(200).json({ message: 'Referral removed' });
    } else {
      res.status(404).json({ message: 'Referral not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
