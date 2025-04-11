// models/progress.js - Mongoose Progress Model
const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completedItems: [{
    type: String, // Stores content IDs like "python_basics"
    required: true
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Add progress percentage virtual field
progressSchema.virtual('progressPercentage').get(function() {
  const course = this.parent().courses.find(c => c._id.equals(this.courseId));
  return course ? Math.round((this.completedItems.length / course.content.length) * 100) : 0;
});

module.exports = mongoose.model('Progress', progressSchema);