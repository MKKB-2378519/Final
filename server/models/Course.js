const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonId: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: Number, required: true } // in minutes
});

const moduleSchema = new mongoose.Schema({
  moduleId: { type: Number, required: true },
  title: { type: String, required: true },
  lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  modules: [moduleSchema]
});

module.exports = mongoose.model('Course', courseSchema);