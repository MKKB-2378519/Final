require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');

// Initialize Express app
const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// After other middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/progress', require('./routes/progress'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server error' });
});

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Tech Courses' });
});

// Course Routes
app.get('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate('instructor', 'name bio')
      .lean();
      
    if (!course) return res.status(404).send('Course not found');
    
    res.render('courses/show', {
      title: course.title,
      course,
      isAuthenticated: req.isAuthenticated() // Will work with your coworker's auth
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// API Routes
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find().lean();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Progress Tracking API
app.post('/api/progress', async (req, res) => {
  try {
    // Temp: Using session until auth is implemented
    const { courseId, lessonId, completed } = req.body;
    
    // In production: await UserProgress.updateOne(
    //   { userId: req.user.id, courseId },
    //   { $addToSet: { completedLessons: lessonId } },
    //   { upsert: true }
    // );
    
    // Temporary session-based solution
    req.session.progress = req.session.progress || {};
    req.session.progress[courseId] = req.session.progress[courseId] || {};
    req.session.progress[courseId][lessonId] = completed;
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quiz API
app.post('/api/quizzes/submit', async (req, res) => {
  try {
    const { courseId, quizId, answers } = req.body;
    
    // Temporary storage until auth is ready
    req.session.quizResults = req.session.quizResults || {};
    req.session.quizResults[quizId] = {
      score: calculateScore(answers),
      timestamp: new Date()
    };
    
    res.json({ 
      success: true,
      score: req.session.quizResults[quizId].score
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message });
});

// Session Configuration (Temp for development)
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Helper Functions
function calculateScore(answers) {
  // Implement your scoring logic
  return answers.filter(a => a.isCorrect).length / answers.length * 100;
}