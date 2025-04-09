const express = require('express');
const router = express.Router();
const { User } = require('../backend/models');
const jwt = require('jsonwebtoken');

// @route    POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'student'
    });

    const token = user.generateAuthToken();
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route    POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = user.generateAuthToken();
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

// @route    GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, error: 'Not authorized' });
  }
});

module.exports = router;