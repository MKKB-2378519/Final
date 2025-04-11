// courseProgress.js - Course Page Progress Tracker
class CourseProgress {
    constructor(courseId) {
      this.courseId = courseId;
      this.progress = this.loadProgress();
    }
  
    async loadProgress() {
      try {
        const response = await fetch(`/api/progress/${this.courseId}`, {
          headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        });
        return await response.json();
      } catch (error) {
        console.error("Failed to load progress:", error);
        return this.getLocalProgress();
      }
    }
  
    async markComplete(contentId) {
      this.progress.completedItems.push(contentId);
      await this.saveProgress();
      this.updateUI();
    }
  
    async saveProgress() {
      // Save to both backend and localStorage
      localStorage.setItem(`progress_${this.courseId}`, JSON.stringify(this.progress));
      
      await fetch(`/api/progress/${this.courseId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}` 
        },
        body: JSON.stringify(this.progress)
      });
    }
  
    updateUI() {
      const percent = this.calculateProgress();
      document.getElementById('chapter-progress').style.width = `${percent}%`;
      document.getElementById('progress-text').textContent = `${percent}% Complete`;
    }
  }
  
  // Initialize on course pages
  if (document.getElementById('chapter-progress')) {
    const courseId = document.body.dataset.courseId;
    window.courseProgress = new CourseProgress(courseId);
  }