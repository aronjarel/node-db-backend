const express = require('express');
const { authenticateToken, authorizeRoles } = require('./authMiddleware');

const router = express.Router();

// Admin dashboard route
router.get('/admin', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Teacher dashboard route
router.get('/teacher', authenticateToken, authorizeRoles('teacher'), (req, res) => {
  res.json({ message: 'Welcome Teacher!' });
});

// Student dashboard route
router.get('/student', authenticateToken, authorizeRoles('student'), (req, res) => {
  res.json({ message: 'Welcome Student!' });
});

module.exports = router;
