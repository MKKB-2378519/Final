const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Optional for pagination

// Lesson Schema
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  videoUrl: {
    type: String,
    match: [/^https?:\/\//, 'Please use a valid URL with HTTP/HTTPS']
  },
  thumbnailUrl: String,
  resources: [
    {
      name: String,
      url: String,
      type: {
        type: String,
        enum: ['pdf', 'zip', 'code', 'other']
      }
    }
  ],
  isFree: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

// Quiz Question Schema
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: opts => opts.length >= 2,
      message: 'At least 2 options are required'
    }
  },
  correctAnswer: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: [0, 'Answer index cannot be negative']
  },
  explanation: String,
  points: {
    type: Number,
    default: 1,
    min: [1, 'Points must be at least 1']
  }
});

// Chapter Schema
const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Chapter title is required'],
    trim: true
  },
  description: String,
  lessons: [lessonSchema],
  quiz: {
    title: String,
    questions: [quizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70,
      min: [0, 'Passing score cannot be negative'],
      max: [100, 'Passing score cannot exceed 100']
    },
    maxAttempts: {
      type: Number,
      default: 3,
      min: [1, 'At least 1 attempt must be allowed']
    }
  },
  order: {
    type: Number,
    required: [true, 'Chapter order is required'],
    min: [0, 'Order cannot be negative']
  }
}, { timestamps: true });

// Main Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  description: {
    short: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [150, 'Short description cannot exceed 150 characters']
    },
    full: {
      type: String,
      required: [true, 'Full description is required']
    }
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  promoVideoUrl: String,
  chapters: [chapterSchema],
  price: {
    amount: {
      type: Number,
      default: 0,
      min: [0, 'Price cannot be negative']
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP']
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  requirements: [String],
  whatYoullLearn: [String],
  totalStudents: {
    type: Number,
    default: 0,
    min: [0, 'Student count cannot be negative']
  },
  totalHours: {
    type: Number,
    default: 0,
    min: [0, 'Total hours cannot be negative']
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Count cannot be negative']
    }
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function() {
  return this.chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
});

// Virtual for total quizzes count
courseSchema.virtual('totalQuizzes').get(function() {
  return this.chapters.filter(chapter => chapter.quiz).length;
});

// Pagination plugin (optional)
courseSchema.plugin(mongoosePaginate);

// Pre-save hook to calculate total hours
courseSchema.pre('save', function(next) {
  this.totalHours = this.chapters.reduce((total, chapter) => {
    return total + chapter.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);
  }, 0) / 60; // Convert minutes to hours
  next();
});

// Indexes for better performance
courseSchema.index({ title: 'text', 'description.short': 'text' });
courseSchema.index({ instructor: 1 });
courseSchema.index({ isPublished: 1, createdAt: -1 });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;