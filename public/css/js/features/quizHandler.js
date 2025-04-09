/**
 * Quiz Handler - Manages quiz functionality for course pages
 */

// Quiz state
const QuizState = {
    currentQuiz: null,
    userAnswers: [],
    startTime: null,
    endTime: null
  };
  
  // DOM Elements
  const quizModal = document.createElement('div');
  quizModal.className = 'quiz-modal';
  document.body.appendChild(quizModal);
  
  // Initialize quiz system
  document.addEventListener('DOMContentLoaded', () => {
    // Event delegation for quiz buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('start-quiz-btn')) {
        const quizId = e.target.dataset.quizId;
        const courseId = UrlParams.get('courseId');
        startQuiz(courseId, quizId);
      }
    });
  });
  
  /**
   * Starts a quiz by ID
   */
  function startQuiz(courseId, quizId) {
    const course = coursesData.courses.find(c => c.id === parseInt(courseId));
    if (!course) return;
  
    const quiz = course.content.find(item => item.id === quizId && item.type === 'quiz');
    if (!quiz) return;
  
    QuizState.currentQuiz = quiz;
    QuizState.userAnswers = [];
    QuizState.startTime = new Date();
  
    renderQuizModal(quiz);
  }
  
  /**
   * Renders the quiz modal with questions
   */
  function renderQuizModal(quiz) {
    quizModal.innerHTML = `
      <div class="quiz-content">
        <h2>${quiz.title}</h2>
        <div class="quiz-questions" id="quiz-questions"></div>
        <div class="quiz-controls">
          <button id="submit-quiz">Submit Quiz</button>
          <div class="quiz-timer">Time: <span id="quiz-time">00:00</span></div>
        </div>
      </div>
    `;
  
    // Render questions
    const questionsContainer = document.getElementById('quiz-questions');
    
    // In a real app, you would fetch questions from your database
    // For now, we'll use mock questions
    const mockQuestions = generateMockQuestions(quiz.id);
    
    mockQuestions.forEach((question, index) => {
      questionsContainer.innerHTML += `
        <div class="quiz-question" data-question-id="${question.id}">
          <h3>${index + 1}. ${question.text}</h3>
          <div class="quiz-options">
            ${question.options.map((option, i) => `
              <label>
                <input type="radio" name="q${index}" value="${i}">
                ${option}
              </label>
            `).join('')}
          </div>
        </div>
      `;
    });
  
    // Start timer
    const timerInterval = setInterval(updateQuizTimer, 1000);
    
    // Handle quiz submission
    document.getElementById('submit-quiz').addEventListener('click', () => {
      clearInterval(timerInterval);
      submitQuiz(mockQuestions);
    });
  
    quizModal.style.display = 'flex';
  }
  
  /**
   * Generates mock quiz questions (replace with real data later)
   */
  function generateMockQuestions(quizId) {
    // This would come from your database in a real app
    const questionBank = {
      'python_quiz': [
        {
          id: 'py_q1',
          text: "Which keyword defines a function in Python?",
          options: ["func", "def", "function", "define"],
          correctAnswer: 1
        },
        {
          id: 'py_q2',
          text: "How do you create a comment in Python?",
          options: ["// comment", "# comment", "/* comment */", "-- comment"],
          correctAnswer: 1
        }
      ],
      'web_quiz': [
        {
          id: 'web_q1',
          text: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
          ],
          correctAnswer: 2
        }
      ]
    };
  
    return questionBank[quizId] || [
      {
        id: 'default_q1',
        text: "Sample question 1",
        options: ["Option 1", "Option 2", "Option 3"],
        correctAnswer: 0
      }
    ];
  }
  
  /**
   * Updates the quiz timer
   */
  function updateQuizTimer() {
    const now = new Date();
    const elapsed = new Date(now - QuizState.startTime);
    const minutes = elapsed.getMinutes().toString().padStart(2, '0');
    const seconds = elapsed.getSeconds().toString().padStart(2, '0');
    document.getElementById('quiz-time').textContent = `${minutes}:${seconds}`;
  }
  
  /**
   * Handles quiz submission
   */
  function submitQuiz(questions) {
    QuizState.endTime = new Date();
    const results = calculateResults(questions);
    displayResults(results);
  }
  
  /**
   * Calculates quiz results
   */
  function calculateResults(questions) {
    let correct = 0;
    const results = [];
  
    questions.forEach((question, index) => {
      const selectedOption = document.querySelector(
        `input[name="q${index}"]:checked`
      );
      const isCorrect = selectedOption && 
        parseInt(selectedOption.value) === question.correctAnswer;
  
      if (isCorrect) correct++;
  
      results.push({
        questionId: question.id,
        questionText: question.text,
        selectedAnswer: selectedOption ? parseInt(selectedOption.value) : null,
        isCorrect,
        correctAnswer: question.correctAnswer
      });
    });
  
    return {
      totalQuestions: questions.length,
      correctAnswers: correct,
      percentage: Math.round((correct / questions.length) * 100),
      details: results
    };
  }
  
  /**
   * Displays quiz results
   */
  function displayResults(results) {
    quizModal.innerHTML = `
      <div class="quiz-results">
        <h2>Quiz Results</h2>
        <div class="quiz-score">
          You scored ${results.correctAnswers}/${results.totalQuestions} (${results.percentage}%)
        </div>
        <div class="quiz-details">
          ${results.details.map((q, i) => `
            <div class="question-result ${q.isCorrect ? 'correct' : 'incorrect'}">
              <h4>${i + 1}. ${q.questionText}</h4>
              <p>Your answer: ${q.selectedAnswer !== null ? 
                q.selectedAnswer + 1 : 'Unanswered'}</p>
              ${!q.isCorrect ? `
                <p class="correct-answer">Correct answer: ${q.correctAnswer + 1}</p>
              ` : ''}
            </div>
          `).join('')}
        </div>
        <button id="close-quiz">Close Quiz</button>
      </div>
    `;
  
    document.getElementById('close-quiz').addEventListener('click', () => {
      quizModal.style.display = 'none';
      updateUserProgress(results.percentage);
    });
  }
  
  /**
   * Updates user progress after quiz completion
   */
  function updateUserProgress(score) {
    if (score >= 70) {
      const courseId = UrlParams.get('courseId');
      const quizId = QuizState.currentQuiz.id;
      
      // In a real app, save to MongoDB via API
      console.log(`User passed quiz ${quizId} in course ${courseId}`);
      
      // Update UI
      const quizButton = document.querySelector(`[data-quiz-id="${quizId}"]`);
      if (quizButton) {
        quizButton.textContent = '✓ Quiz Completed';
        quizButton.classList.add('completed');
      }
    }
  }
  
  // Inject styles
  const styleTag = document.createElement('style');
  styleTag.textContent = quizModalCSS;
  document.head.appendChild(styleTag);