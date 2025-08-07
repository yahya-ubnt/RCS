// backend/controllers/payoutController.js
const Payout = require('../models/Payout');

// @desc    Get all payouts
// @route   GET /api/payouts
// @access  Private
exports.getAllPayouts = async (req, res) => {
  try {
    const payouts = await Payout.find({}).populate('agent');
    res.status(200).json(payouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single payout by ID
// @route   GET /api/payouts/:id
// @access  Private
exports.getPayoutById = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.id).populate('agent');
    if (payout) {
      res.status(200).json(payout);
    } else {
      res.status(404).json({ message: 'Payout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new payout
// @route   POST /api/payouts
// @access  Private/Admin
exports.createPayout = async (req, res) => {
  const { agent, amount, status, transactionId } = req.body;

  try {
    const payout = await Payout.create({
      agent,
      amount,
      status,
      transactionId,
    });

    if (payout) {
      res.status(201).json(payout);
    } else {
      res.status(400).json({ message: 'Invalid payout data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a payout
// @route   PUT /api/payouts/:id
// @access  Private/Admin
exports.updatePayout = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.id);

    if (payout) {
      payout.agent = req.body.agent || payout.agent;
      payout.amount = req.body.amount || payout.amount;
      payout.status = req.body.status || payout.status;
      payout.transactionId = req.body.transactionId || payout.transactionId;

      const updatedPayout = await payout.save();
      res.status(200).json(updatedPayout);
    } else {
      res.status(404).json({ message: 'Payout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a payout
// @route   DELETE /api/payouts/:id
// @access  Private/Admin
exports.deletePayout = async (req, res) => {
  try {
    const payout = await Payout.findById(req.params.id);

    if (payout) {
      await payout.deleteOne();
      res.status(200).json({ message: 'Payout removed' });
    } else {
      res.status(404).json({ message: 'Payout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
