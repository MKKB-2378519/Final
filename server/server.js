require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500; // Using 5500 

// ===== Essential Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('public')); 

// ===== Routes =====
const courseRoutes = require('./routes/courses');
app.use('/api/courses', courseRoutes);

// Malik's authRoutes will go somewhere here

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- GET /api/courses/json');
  console.log('- GET /api/courses');
  console.log('- GET /api/courses/:courseId');
});