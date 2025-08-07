// backend/config/env.js
// This file is for environment variables. In a real application, you would use a .env file and a library like `dotenv`.

// Example:
// require('dotenv').config();

// module.exports = {
//   MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/referral_system',
//   JWT_SECRET: process.env.JWT_SECRET || 'supersecretjwtkey',
//   SMS_API_KEY: process.env.SMS_API_KEY,
//   MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
//   MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
// };

// For now, we'll just export some placeholders
module.exports = {
  MONGO_URI: 'mongodb://localhost:27017/referral_system_dev',
  JWT_SECRET: 'your_jwt_secret_here',
  SMS_API_KEY: 'your_sms_api_key_here',
  MPESA_CONSUMER_KEY: 'your_mpesa_consumer_key_here',
  MPESA_CONSUMER_SECRET: 'your_mpesa_consumer_secret_here',
};
