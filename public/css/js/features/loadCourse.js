// public/js/loadCourse.js

/**
 * Loads and renders course data dynamically
 */

// DOM Elements
const dynamicContent = document.getElementById('dynamic-content');
const staticContent = document.getElementById('static-content');
const loadingSpinner = '<div class="loading-spinner"></div>';

// 1. Initialize Course Loading
function initCourseLoading() {
    // Show loading state
    dynamicContent.innerHTML = loadingSpinner;
    
    // Hide static content if JS loads
    if (staticContent) staticContent.style.display = 'none';
    
    // Load course data
    loadCourseData();
}

// 2. Load Course Data
function loadCourseData() {
    try {
        const courseId = getCourseIdFromURL();
        if (!courseId) throw new Error('No course ID specified');
        
        const course = findCourse(courseId);
        if (!course) throw new Error('Course not found');
        
        renderCourse(course);
    } catch (error) {
        handleLoadingError(error);
    }
}

// 3. Helper Functions
document.addEventListener('DOMContentLoaded', function() {
    // Use UrlParams globally (defined by urlParams.js)
    const courseId = UrlParams.get('courseId', 1); // Fallback to courseId=1 if missing
    
    if (!courseId) {
        console.error("Course ID not found in URL");
        return;
    }
});

function findCourse(courseId) {
    return coursesData.courses.find(c => c.id === courseId);
}

function findInstructor(instructorId) {
    return coursesData.instructors.find(i => i.id === instructorId);
}

// 4. Rendering Functions
function renderCourse(course) {
    const instructor = findInstructor(course.instructorId);
    
    // Update course metadata
    document.getElementById('course-title').textContent = course.title;
    document.getElementById('short-description').textContent = course.shortDescription;
    document.getElementById('full-description').textContent = course.fullDescription;
    document.getElementById('course-duration').textContent = course.duration;
    document.getElementById('content-count').textContent = 
        `${course.content.filter(c => c.type === 'video').length} lessons, 
         ${course.content.filter(c => c.type === 'quiz').length} quizzes`;
    
    // Render content and instructor
    renderCourseContent(course);
    renderInstructor(instructor);
    renderReviews(course.id);
}

function renderCourseContent(course) {
    const contentHtml = course.content.map(item => `
      <div class="content-item" data-type="${item.type}" data-id="${item.id}">
        <div class="item-icon">
          ${item.type === 'quiz' ? '🧠' : '📺'}
        </div>
        <div class="item-details">
          <h3>${item.title}</h3>
          <p class="item-meta">
            <span>${item.type} | ${item.duration}</span>
            ${item.prerequisites?.length ? 
              `<span class="prereqs">Requires: ${item.prerequisites.join(', ')}</span>` : ''}
          </p>
          
          <!-- Add this quiz button section -->
          ${item.type === 'quiz' ? 
            `<button class="start-quiz-btn" data-quiz-id="${item.id}">
              ${item.completed ? '✓ Completed' : 'Start Quiz'}
            </button>` : 
            `<button class="start-content-btn" data-item-id="${item.id}">
              ${item.completed ? '✓ Completed' : 'Start'}
            </button>`
          }
        </div>
      </div>
    `).join('');
  
    dynamicContent.innerHTML = contentHtml;
    
    // Add event listeners
    document.querySelectorAll('.start-item').forEach(btn => {
        btn.addEventListener('click', handleContentItemClick);
    });
}

function renderInstructor(instructor) {
    document.getElementById('instructor-card').innerHTML = `
        <div class="contributor-header">
            <img src="/images/instructors/${instructor.id}.jpg" 
                 alt="${instructor.name}" 
                 class="contributor-img"
                 onerror="this.src='/images/instructors/default.jpg'">
            <div>
                <h4>${instructor.name}</h4>
                <p class="contributor-title">Course Instructor</p>
            </div>
        </div>
        <div class="contributor-bio">
            <p>${instructor.bio}</p>
            <button class="contact-btn" data-email="${instructor.email}">
                Contact Instructor
            </button>
        </div>
    `;
}

function renderReviews(courseId) {
    const reviewsContainer = document.getElementById('course-reviews');
    const reviews = coursesData.reviews.filter(r => r.courseId === courseId);
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>No reviews yet. Be the first!</p>';
        return;
    }
    
    const reviewsHtml = reviews.map(review => `
        <div class="review" data-rating="${review.rating}">
            <div class="review-header">
                <span class="stars">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </span>
                <span class="reviewer">${review.user}</span>
                <span class="date">
                    ${new Date(review.date).toLocaleDateString()}
                </span>
            </div>
            <p class="review-text">${review.comment}</p>
        </div>
    `).join('');
    
    reviewsContainer.innerHTML = reviewsHtml;
}

// 5. Event Handlers
function handleContentItemClick(e) {
    const itemId = e.target.dataset.id;
    const courseId = getCourseIdFromURL();
    const item = coursesData.courses
        .find(c => c.id === courseId)
        .content.find(i => i.id === itemId);
    
    if (item.type === 'quiz') {
        // Will be handled by quizHandler.js
        console.log('Launching quiz:', itemId);
    } else {
        // Handle video/content viewing
        console.log('Playing content:', itemId);
    }
}

function handleLoadingError(error) {
    console.error('Course loading error:', error);
    dynamicContent.innerHTML = `
        <div class="error-message">
            <h3>Error Loading Course</h3>
            <p>${error.message}</p>
            <a href="/courses.html" class="btn">Browse All Courses</a>
        </div>
    `;
    
    // Show static fallback if available
    if (staticContent) staticContent.style.display = 'block';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCourseLoading);

