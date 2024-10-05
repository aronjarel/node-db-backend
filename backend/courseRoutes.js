// courseRoutes.js
const express = require('express');
const { authenticateToken, authorizeRoles } = require('./authMiddleware');
const { createCourseHandler, getCoursesHandler, updateCourseHandler, deleteCourseHandler } = require('./courseController');

const router = express.Router();

// Create a course (teachers only)
router.post('/', authenticateToken, authorizeRoles('teacher'), createCourseHandler);

// Get all courses (public)
router.get('/', getCoursesHandler);

// Update a course (teachers only)
router.put('/:id', authenticateToken, authorizeRoles('teacher'), updateCourseHandler);

// Delete a course (teachers only)
router.delete('/:id', authenticateToken, authorizeRoles('teacher'), deleteCourseHandler);

module.exports = router;
