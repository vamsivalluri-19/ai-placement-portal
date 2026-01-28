const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  college: String,
  role: { type: String, enum: ['student', 'staff', 'hr', 'admin'], required: true },
  isVerified: { type: Boolean, default: false },
  profileComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
