// backend/controllers/commissionController.js
const Commission = require('../models/Commission');

// @desc    Get all commissions
// @route   GET /api/commissions
// @access  Private
exports.getAllCommissions = async (req, res) => {
  try {
    const commissions = await Commission.find({}).populate('referral').populate('agent');
    res.status(200).json(commissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single commission by ID
// @route   GET /api/commissions/:id
// @access  Private
exports.getCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id).populate('referral').populate('agent');
    if (commission) {
      res.status(200).json(commission);
    } else {
      res.status(404).json({ message: 'Commission not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new commission
// @route   POST /api/commissions
// @access  Private/Admin
exports.createCommission = async (req, res) => {
  const { referral, agent, amount, status } = req.body;

  try {
    const commission = await Commission.create({
      referral,
      agent,
      amount,
      status,
    });

    if (commission) {
      res.status(201).json(commission);
    } else {
      res.status(400).json({ message: 'Invalid commission data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a commission
// @route   PUT /api/commissions/:id
// @access  Private/Admin
exports.updateCommission = async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);

    if (commission) {
      commission.referral = req.body.referral || commission.referral;
      commission.agent = req.body.agent || commission.agent;
      commission.amount = req.body.amount || commission.amount;
      commission.status = req.body.status || commission.status;

      const updatedCommission = await commission.save();
      res.status(200).json(updatedCommission);
    } else {
      res.status(404).json({ message: 'Commission not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a commission
// @route   DELETE /api/commissions/:id
// @access  Private/Admin
exports.deleteCommission = async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);

    if (commission) {
      await commission.deleteOne();
      res.status(200).json({ message: 'Commission removed' });
    } else {
      res.status(404).json({ message: 'Commission not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
