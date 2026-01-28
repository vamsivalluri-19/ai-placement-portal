const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, phone, college, role } = req.body;
    
    // Simple validation
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role required' });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName: fullName || email.split('@')[0],
      email,
      password: hashedPassword,
      phone: phone || '',
      college: college || '',
      role,
      isVerified: true, // Skip verification for demo
      profileComplete: false
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id, role }, 'super-secret-key-2026', { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: user._id, email: user.email, role: user.role, fullName: user.fullName }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'Wrong role for this account' });
    }

    const token = jwt.sign({ userId: user._id, role }, 'super-secret-key-2026', { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        college: user.college || ''
      },
      expiry: Date.now() + 7 * 24 * 60 * 60 * 1000
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
