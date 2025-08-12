const express = require('express');
const connectDB = require('./config/db');

// Import routes
const leadRoutes = require('./routes/leadRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const unitRoutes = require('./routes/unitRoutes');
const userRoutes = require('./routes/userRoutes');

const caretakerAgentRoutes = require('./routes/caretakerAgentRoutes');

// Mount unit routes under building routes
buildingRoutes.use('/:buildingId/units', unitRoutes);


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Basic route
app.get('/', (req, res) => {
  res.send('Referral and Commission System Backend API');
});

// Mount routes
app.use('/api/leads', leadRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/users', userRoutes);

app.use('/api/staff', caretakerAgentRoutes);


// Simple GET routes for testing wiring
app.get('/api/test/buildings', (req, res) => res.json({ message: 'GET /api/buildings endpoint is wired.' }));
app.get('/api/test/units', (req, res) => res.json({ message: 'GET /api/units endpoint is wired.' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes