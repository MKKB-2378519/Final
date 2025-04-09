/**
 * Main Application Script - Core functionality only
 */

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', function() {
    initializeCoursePage();
    setupEventDelegation();
  });
  
  // Core Initialization
  function initializeCoursePage() {
    // 1. Check authentication status (placeholder for auth integration)
    const isAuthenticated = checkAuthStatus(); 
    
    // 2. Initialize UI components
    initProgressTracking();
    initBookmarking();
    
    // 3. Load dynamic content if JS is working
    document.getElementById('static-content').style.display = 'none';
  }
  
  // Authentication Check (Temporary)
  function checkAuthStatus() {
    // Replace with your coworker's auth check later
    return localStorage.getItem('mockAuth') === 'true'; 
  }
  
  // Progress Tracking
  function initProgressTracking() {
    // Load progress from localStorage or API
    const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
    
    // Update UI
    if (progress.currentLesson) {
      document.querySelector('.primary-action').textContent = 'Continue';
    }
    
    // Initialize progress bar
    updateProgressBar(progress.percentage || 0);
  }
  
  function updateProgressBar(percentage) {
    const progressBar = document.getElementById('course-progress');
    if (progressBar) {
      progressBar.value = percentage;
      document.getElementById('progress-percent').textContent = percentage;
    }
  }
  
  // Bookmarking System
  function initBookmarking() {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', toggleBookmark);
    }
  }
  
  function toggleBookmark() {
    const isBookmarked = this.classList.toggle('bookmarked');
    localStorage.setItem('courseBookmarked', isBookmarked);
    
    // Update icon
    const icon = this.querySelector('svg path');
    icon.setAttribute('fill', isBookmarked ? '#3ddc91' : 'none');
  }
  
  // Event Delegation Hub
  function setupEventDelegation() {
    document.addEventListener('click', function(e) {
      // Content item clicks
      if (e.target.closest('.start-content-btn')) {
        handleContentItemClick(e.target.closest('[data-item-id]'));
      }
      
      // Read more/less toggle
      if (e.target.classList.contains('read-more-btn')) {
        toggleDescription(e.target);
      }
    });
  }
  
  // Content Navigation
  function handleContentItemClick(itemElement) {
    const itemId = itemElement.dataset.itemId;
    if (!checkAuthStatus()) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    
    // In a real app, this would track progress via API
    console.log('Starting content item:', itemId);
    itemElement.querySelector('button').textContent = '✓ Completed';
  }
  
  // Description Toggle
  function toggleDescription(button) {
    const container = button.closest('.course-description');
    container.querySelector('.description-truncated').style.display = 'none';
    container.querySelector('.description-full').style.display = 'block';
  }
  
  // Export for module support (if using bundler)
  export { initializeCoursePage, checkAuthStatus };