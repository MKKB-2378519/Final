const express = require('express');
const router = express.Router();
const { Course } = require('../backend/models');
const advancedResults = require('../middleware/advancedResults'); // Optional for filtering

// @route    GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'username email')
      .lean();
      
    res.json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route    GET /api/courses/:id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'username bio')
      .lean();
      
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
    
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route    POST /api/courses/enroll
router.post('/enroll', async (req, res) => {
  try {
    const { courseId } = req.body;
    
    // In real app, get user from auth middleware
    const user = await User.findById(req.user.id);
    user.enrolledCourses.push({ course: courseId });
    await user.save();
    
    res.json({ success: true, data: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;