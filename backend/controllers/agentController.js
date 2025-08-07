// backend/controllers/agentController.js
const Agent = require('../models/Agent');

// @desc    Get all agents
// @route   GET /api/agents
// @access  Public (for now, will be protected later)
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single agent by ID
// @route   GET /api/agents/:id
// @access  Public
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (agent) {
      res.status(200).json(agent);
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new agent
// @route   POST /api/agents
// @access  Private/Admin
exports.createAgent = async (req, res) => {
  const { name, email, phone, password, isAdmin } = req.body;

  try {
    const agentExists = await Agent.findOne({ email });
    if (agentExists) {
      return res.status(400).json({ message: 'Agent with that email already exists' });
    }

    const agent = await Agent.create({
      name,
      email,
      phone,
      password,
      isAdmin: isAdmin || false, // Default to false if not provided
    });

    if (agent) {
      res.status(201).json({
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        isAdmin: agent.isAdmin,
      });
    } else {
      res.status(400).json({ message: 'Invalid agent data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an agent
// @route   PUT /api/agents/:id
// @access  Private/Admin
exports.updateAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (agent) {
      agent.name = req.body.name || agent.name;
      agent.email = req.body.email || agent.email;
      agent.phone = req.body.phone || agent.phone;
      if (req.body.password) {
        agent.password = req.body.password;
      }
      if (req.body.isAdmin !== undefined) {
        agent.isAdmin = req.body.isAdmin;
      }

      const updatedAgent = await agent.save();
      res.status(200).json({
        _id: updatedAgent._id,
        name: updatedAgent.name,
        email: updatedAgent.email,
        phone: updatedAgent.phone,
        isAdmin: updatedAgent.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an agent
// @route   DELETE /api/agents/:id
// @access  Private/Admin
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (agent) {
      await agent.deleteOne(); // Use deleteOne() instead of remove()
      res.status(200).json({ message: 'Agent removed' });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};