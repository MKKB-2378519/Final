require('dotenv').config();
const mongoose = require('mongoose');
const { Course, UserProgress } = require('../models');
const bcrypt = require('bcryptjs'); // For creating test users if needed

// Sample data
const sampleInstructors = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Professor Oak',
    email: 'oak@teched.com',
    bio: 'Python expert and Pokémon researcher',
    password: bcrypt.hashSync('pikachu123', 10)
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Professor Elm',
    email: 'elm@teched.com',
    bio: 'Web development specialist',
    password: bcrypt.hashSync('cyndaquil123', 10)
  }
];

const sampleCourses = [
  {
    title: 'Python Programming Masterclass',
    instructor: sampleInstructors[0]._id,
    description: {
      short: 'Learn Python from scratch to advanced',
      full: 'Comprehensive Python course covering basics to advanced concepts...'
    },
    duration: '10 hours',
    level: 'Beginner',
    thumbnail: 'python-thumbnail.jpg',
    chapters: [
      {
        title: 'Python Basics',
        order: 1,
        lessons: [
          {
            title: 'Introduction to Python',
            duration: 30,
            content: '...',
            videoUrl: '/videos/python-intro.mp4'
          },
          {
            title: 'Variables and Data Types',
            duration: 45,
            content: '...',
            videoUrl: '/videos/python-variables.mp4'
          }
        ],
        quiz: {
          title: 'Python Basics Quiz',
          questions: [
            {
              text: 'Which keyword defines a function in Python?',
              options: ['func', 'def', 'function', 'define'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        }
      }
    ]
  }
];

async function initializeDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data (optional)
    await mongoose.connection.dropDatabase();
    console.log('Database cleared');

    // Create instructors (if using User model)
    // await User.insertMany(sampleInstructors);

    // Create courses
    const createdCourses = await Course.insertMany(sampleCourses);
    console.log(`${createdCourses.length} courses created`);

    // Create sample progress data
    const sampleProgress = {
      userId: sampleInstructors[0]._id, // Will be replaced with real user ID
      courseId: createdCourses[0]._id,
      completedLessons: [createdCourses[0].chapters[0].lessons[0]._id],
      currentChapter: 0,
      currentLesson: 1,
      quizResults: []
    };
    await UserProgress.create(sampleProgress);
    console.log('Sample progress data created');

    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Initialization error:', err);
  } finally {
    mongoose.connection.close();
  }
}

// Run the initialization
initializeDatabase();