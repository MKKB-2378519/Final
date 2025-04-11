// main.js - Homepage Logic
document.addEventListener('DOMContentLoaded', async function() {
    // Auth check (to be replaced by Malik's implementation)
    if (!checkAuthStatus()) return;
    
    try {
      const progressData = await fetchCourseProgress();
      renderProgressBars(progressData);
      setupCourseNavigation();
    } catch (error) {
      console.error("Progress load failed:", error);
      renderProgressBars(getLocalProgress()); // Fallback to localStorage
    }
  });
  
  async function fetchCourseProgress() {
    const response = await fetch('/api/users/progress', {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return await response.json();
  }
  
  function renderProgressBars(progressData) {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const courseId = bar.dataset.courseId;
      const progress = progressData[courseId] || 0;
      bar.querySelector('.progress').style.width = `${progress}%`;
    });
  }