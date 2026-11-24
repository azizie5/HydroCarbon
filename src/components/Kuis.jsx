import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  Flame, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { chemData } from '../data/chemdata.js';

export default function Kuis({ onQuizCompleted }) {
  // Ambil bank soal aktif dari localStorage jika pernah dikonfigurasi guru, atau default chemData
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('hydrocarbon_quiz_questions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return chemData;
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [savedHighScore, setSavedHighScore] = useState(0);

  // Sync soal saat ada update dari panel guru
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('hydrocarbon_quiz_questions');
        if (saved) setQuestions(JSON.parse(saved));
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Load high score from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hidrokarbon_quiz_score');
      if (saved) {
        setSavedHighScore(parseInt(saved, 10));
      }
    } catch {
      setSavedHighScore(0);
    }
  }, []);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIdx] || questions[0];
  const chosenOptionId = currentQuestion ? selectedAnswers[currentQuestion.id] : null;

  // Siswa memilih satu opsi jawaban
  const handleSelectOption = (optionId) => {
    if (showFeedback || isSubmitted || !currentQuestion) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    setShowFeedback(true);

    const isCorrect = optionId === currentQuestion.jawabanBenar;
    if (isCorrect) {
      setStreak((prev) => {
        const next = prev + 1;
        if (next > bestStreak) setBestStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  // Navigasi ke soal berikutnya
  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Selesaikan kuis dan kalkulasi nilai
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.jawabanBenar) {
        correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setIsSubmitted(true);

    try {
      const currentBest = parseInt(localStorage.getItem('hidrokarbon_quiz_score') || '0', 10);
      if (finalScore > currentBest) {
        localStorage.setItem('hidrokarbon_quiz_score', finalScore.toString());
        setSavedHighScore(finalScore);
      }
      if (onQuizCompleted) {
        onQuizCompleted(finalScore);
      }
    } catch (e) {
      console.error('Gagal menyimpan nilai kuis', e);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
    setShowFeedback(false);
    setStreak(0);
  };

  // Kalkulasi skor akhir
  let finalScore = 0;
  let correctCount = 0;
  if (isSubmitted) {
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.jawabanBenar) {
        correctCount += 1;
      }
    });
    finalScore = Math.round((correctCount / totalQuestions) * 100);
  }

  return (
    <section className="quiz-section-container" id="kuis" aria-labelledby="kuis-heading">
      <div className="section-head text-center">
        <span className="section-pill">Evaluasi Formatif Gamifikasi</span>
        <h2 className="section-title" id="kuis-heading">
          Kuis Interaktif Hidrokarbon
        </h2>
        <p className="section-subtitle">
          Uji pemahamanmu tentang rumus umum, tata nama IUPAC, massa molekul relatif, dan isomerisme dengan umpan balik langsung dan penjelasan ilmiah.
        </p>
      </div>

      <div className="quiz-card-wrapper">
        {!isSubmitted ? (
          <div className="quiz-active-card">
            {/* Header Kuis: Progres & Streak */}
            <div className="quiz-top-bar">
              <div className="quiz-progress-text">
                Soal <strong>{currentIdx + 1}</strong> dari {totalQuestions}
              </div>

              <div className="quiz-metrics">
                {streak > 1 && (
                  <div className="streak-badge">
                    <Flame size={16} />
                    <span>{streak}x Benar Beruntun!</span>
                  </div>
                )}
                {savedHighScore > 0 && (
                  <div className="high-score-badge">
                    <Award size={14} />
                    <span>Skor Terbaik: {savedHighScore}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar Visual */}
            <div className="quiz-progress-track">
              <div 
                className="quiz-progress-fill"
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>

            {/* Pertanyaan */}
            <div className="quiz-question-box">
              <span className="question-konsep-tag">
                Konsep: {currentQuestion.konsep.replace(/-/g, ' ')}
              </span>
              <h3 className="quiz-question-text">
                {currentQuestion.pertanyaan}
              </h3>
            </div>

            {/* Opsi Jawaban */}
            <div className="quiz-options-list">
              {currentQuestion.opsi.map((opsi) => {
                const isSelected = chosenOptionId === opsi.id;
                const isCorrect = opsi.id === currentQuestion.jawabanBenar;

                let optClass = 'quiz-option-btn';
                if (showFeedback) {
                  if (isCorrect) {
                    optClass += ' correct-opt';
                  } else if (isSelected && !isCorrect) {
                    optClass += ' incorrect-opt';
                  } else {
                    optClass += ' disabled-opt';
                  }
                } else if (isSelected) {
                  optClass += ' selected-opt';
                }

                return (
                  <button
                    key={opsi.id}
                    type="button"
                    onClick={() => handleSelectOption(opsi.id)}
                    disabled={showFeedback}
                    className={optClass}
                  >
                    <div className="opt-letter-bubble">{opsi.id}</div>
                    <div className="opt-text-content text-mono">{opsi.teks}</div>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 size={20} className="opt-icon-status correct" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle size={20} className="opt-icon-status incorrect" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Kotak Feedback Gamifikasi */}
            {showFeedback && (
              <div className={`quiz-feedback-box ${chosenOptionId === currentQuestion.jawabanBenar ? 'fb-correct' : 'fb-incorrect'}`}>
                <div className="fb-header">
                  {chosenOptionId === currentQuestion.jawabanBenar ? (
                    <>
                      <Sparkles size={20} />
                      <strong>Jawabanmu Tepat Sekali!</strong>
                    </>
                  ) : (
                    <>
                      <HelpCircle size={20} />
                      <strong>Perhatikan Umpan Balik Ini:</strong>
                    </>
                  )}
                </div>
                <p className="fb-body">
                  {currentQuestion.opsi.find((o) => o.id === chosenOptionId)?.feedback}
                </p>

                <div className="fb-action">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="btn-next-question"
                  >
                    <span>{currentIdx < totalQuestions - 1 ? 'Lanjut ke Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tampilan Hasil Akhir Kuis */
          <div className="quiz-result-card">
            <div className="result-badge-icon">
              <Award size={48} />
            </div>

            <h3 className="result-title">Hasil Belajar Kuis Kamu</h3>
            <p className="result-lead">
              Kamu telah menjawab <strong>{correctCount}</strong> dari <strong>{totalQuestions}</strong> soal dengan benar.
            </p>

            {/* Skor Meter */}
            <div className="result-score-circle">
              <span className="score-num">{finalScore}</span>
              <span className="score-max">/ 100</span>
            </div>

            <div className="result-eval-text">
              {finalScore === 100 && (
                <p className="eval-perfect">
                  🎉 <strong>Sempurna!</strong> Kamu telah menguasai seluruh konsep hidrokarbon, tata nama, dan isomerisme dengan sangat baik!
                </p>
              )}
              {finalScore >= 80 && finalScore < 100 && (
                <p className="eval-good">
                  ✨ <strong>Hebat!</strong> Pemahaman dasarmu tentang hidrokarbon sudah sangat kuat.
                </p>
              )}
              {finalScore < 80 && (
                <p className="eval-improve">
                  💪 <strong>Terus Semangat!</strong> Kamu bisa membuka kembali modul Alkana, Alkena, dan Alkuna untuk memperdalam materi dan mengulang kuis kapan saja.
                </p>
              )}
            </div>

            {/* Pembahasan Ringkas Semua Soal */}
            <div className="result-review-section">
              <h4 className="review-title">
                <BookOpen size={18} />
                <span>Rangkuman Pembahasan Soal</span>
              </h4>

              <div className="review-list">
                {questions.map((q, qIdx) => {
                  const studentAns = selectedAnswers[q.id];
                  const isRight = studentAns === q.jawabanBenar;

                  return (
                    <div key={q.id} className={`review-item ${isRight ? 'rev-correct' : 'rev-incorrect'}`}>
                      <div className="rev-head">
                        <span className="rev-no">Soal {qIdx + 1}</span>
                        <span className="rev-status">
                          {isRight ? '✓ Benar' : '✗ Belum Tepat'}
                        </span>
                      </div>
                      <p className="rev-question">{q.pertanyaan}</p>
                      <div className="rev-answer-box">
                        <span className="ans-tag">Jawaban Benar:</span>
                        <strong className="text-mono">
                          {q.jawabanBenar}. {q.opsi.find((o) => o.id === q.jawabanBenar)?.teks}
                        </strong>
                      </div>
                      <p className="rev-feedback">
                        {q.opsi.find((o) => o.id === q.jawabanBenar)?.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tombol Aksi Ulangi */}
            <div className="result-actions">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="btn-restart-quiz"
              >
                <RotateCcw size={18} />
                <span>Coba Kuis Lagi</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

