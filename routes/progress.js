const express = require('express');
const router = express.Router();
const { UserProgress } = require('../backend/models');

// @route    POST /api/progress/lesson
router.post('/lesson', async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    
    let progress = await UserProgress.findOne({
      user: req.user.id,
      course: courseId
    });
    
    if (!progress) {
      progress = await UserProgress.create({
        user: req.user.id,
        course: courseId,
        completedLessons: [{ lesson: lessonId }]
      });
    } else {
      // Avoid duplicates
      if (!progress.completedLessons.some(l => l.lesson.equals(lessonId))) {
        progress.completedLessons.push({ lesson: lessonId });
        await progress.save();
      }
    }
    
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route    POST /api/progress/quiz
router.post('/quiz', async (req, res) => {
  try {
    const { courseId, chapterId, score, answers } = req.body;
    
    const progress = await UserProgress.findOneAndUpdate(
      { user: req.user.id, course: courseId },
      {
        $push: {
          quizAttempts: {
            chapter: chapterId,
            score,
            answers,
            passed: score >= 70
          }
        }
      },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route    GET /api/progress/:courseId
router.get('/:courseId', async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      user: req.user.id,
      course: req.params.courseId
    })
    .populate('course')
    .populate('currentState.lesson');
    
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;