import { QUIZ_QUESTIONS } from '../data/quizData.js';
import { getStoredProgress, saveStoredProgress } from '../utils/storage.js';

export function renderQuizModule(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentQuestionIndex = 0;
  let userAnswers = {}; // { questionId: selectedIndex }
  let isSubmitted = false;

  function render() {
    if (isSubmitted) {
      renderResults();
      return;
    }

    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const total = QUIZ_QUESTIONS.length;
    const selected = userAnswers[q.id];

    container.innerHTML = `
      <div class="quiz-wrapper">
        <!-- Progress Bar -->
        <div class="quiz-progress-section">
          <div class="quiz-progress-header">
            <span>Soal ${currentQuestionIndex + 1} dari ${total}</span>
            <span class="quiz-cat-pill">${q.category}</span>
          </div>
          <div class="quiz-bar-bg">
            <div class="quiz-bar-fill" style="width: ${((currentQuestionIndex + 1) / total) * 100}%"></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="question-card">
          <h3 class="q-text">${q.question}</h3>

          <div class="q-options-list">
            ${q.options.map((opt, oIdx) => `
              <button class="q-opt-item ${selected === oIdx ? 'selected' : ''}" data-idx="${oIdx}">
                <span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Footer Navigation -->
        <div class="quiz-footer-actions">
          <button class="btn btn-secondary" id="quizPrevBtn" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
            Kembali
          </button>

          <div class="right-actions">
            ${currentQuestionIndex < total - 1 ? `
              <button class="btn btn-primary" id="quizNextBtn" ${selected === undefined ? 'disabled' : ''}>
                Lanjut ke Soal Berikutnya →
              </button>
            ` : `
              <button class="btn btn-success" id="quizSubmitBtn" ${selected === undefined ? 'disabled' : ''}>
                Selesai & Kumpulkan Kuis 🏆
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    // Listeners
    container.querySelectorAll('.q-opt-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        userAnswers[q.id] = idx;
        render();
      });
    });

    const prev = document.getElementById('quizPrevBtn');
    if (prev) {
      prev.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          render();
        }
      });
    }

    const next = document.getElementById('quizNextBtn');
    if (next) {
      next.addEventListener('click', () => {
        if (currentQuestionIndex < total - 1) {
          currentQuestionIndex++;
          render();
        }
      });
    }

    const submit = document.getElementById('quizSubmitBtn');
    if (submit) {
      submit.addEventListener('click', () => {
        isSubmitted = true;
        calculateAndSaveScore();
        render();
      });
    }
  }

  function calculateAndSaveScore() {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.answerIndex) {
        correctCount++;
      }
    });

    const progress = getStoredProgress();
    progress.quizScore = Math.max(progress.quizScore || 0, Math.round((correctCount / QUIZ_QUESTIONS.length) * 100));
    progress.quizAttempts = (progress.quizAttempts || 0) + 1;
    saveStoredProgress(progress);
  }

  function renderResults() {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.answerIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

    container.innerHTML = `
      <div class="quiz-result-view">
        <div class="result-banner">
          <div class="result-badge">${scorePercent >= 75 ? '🎉 Luar Biasa!' : '💪 Tetap Semangat!'}</div>
          <h2>Hasil Evaluasi Kuis Hidrokarbon</h2>
          <div class="big-score">${scorePercent}<span class="score-unit">%</span></div>
          <p class="score-desc">
            Anda menjawab benar <strong>${correctCount}</strong> dari total <strong>${QUIZ_QUESTIONS.length}</strong> pertanyaan.
          </p>

          <button class="btn btn-primary" id="retakeQuizBtn">
            Ulangi Kuis 🔄
          </button>
        </div>

        <!-- Answers Review -->
        <div class="review-list">
          <h4 class="review-title">Pembahasan Jawaban Lengkap:</h4>
          ${QUIZ_QUESTIONS.map((q, qIdx) => {
            const userPick = userAnswers[q.id];
            const isCorrect = userPick === q.answerIndex;
            return `
              <div class="review-card ${isCorrect ? 'rev-correct' : 'rev-incorrect'}">
                <div class="rev-header">
                  <span class="rev-num">No. ${qIdx + 1} (${q.category})</span>
                  <span class="rev-status">${isCorrect ? '✓ Benar' : '✗ Salah'}</span>
                </div>
                <p class="rev-question">${q.question}</p>
                <div class="rev-comparison">
                  <div class="rev-user-pick">
                    Jawaban Anda: <strong>${userPick !== undefined ? q.options[userPick] : 'Tidak dijawab'}</strong>
                  </div>
                  <div class="rev-correct-pick">
                    Kunci Jawaban: <strong>${q.options[q.answerIndex]}</strong>
                  </div>
                </div>
                <div class="rev-explanation">
                  <strong>Pembahasan:</strong> ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    document.getElementById('retakeQuizBtn')?.addEventListener('click', () => {
      isSubmitted = false;
      currentQuestionIndex = 0;
      userAnswers = {};
      render();
    });
  }

  render();
}
