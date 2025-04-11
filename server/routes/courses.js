const express = require('express');
const router = express.Router();
const path = require('path');
const Course = require('../models/Course');

// Add this new route to serve static JSON data
router.get('/json', (req, res) => {
  const filePath = path.join(__dirname, '../data/courses.json');
  console.log('Attempting to serve:', filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving JSON file:', err);
      res.status(err.status || 500).send('Could not load JSON file');
    }
  });
});


// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({}, 'name description');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get specific course data
router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save progress (placeholder - will need user auth)
router.post('/:courseId/progress', async (req, res) => {
  // This will be implemented with user auth
  res.json({ message: 'Progress saved (placeholder)' });
});

module.exports = router;
