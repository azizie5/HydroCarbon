import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/hydrocarbonData';
import { 
  Trophy, 
  Flame, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  Volume2,
  VolumeX,
  Award,
  Zap
} from 'lucide-react';

export default function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  // Web Audio API Synthesizer for instant pleasant sounds without external audio assets
  const playSoundEffect = (type) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === 'correct') {
        // Melodic chime: C5 -> E5 -> G5
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
        });
      } else if (type === 'wrong') {
        // Soft low double buzz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.setValueAtTime(140, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'victory') {
        // Fanfare
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

          gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
        });
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  };

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    setIsAnswerSubmitted(true);

    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (newStreak > maxStreak) {
      setMaxStreak(newStreak);
    }

    if (isCorrect) {
      const streakBonus = (newStreak - 1) * 20;
      setScore(prev => prev + 100 + Math.max(0, streakBonus));
      playSoundEffect('correct');

      // Trigger Confetti effect
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4B9F84', '#6DBDA3', '#FAF6EF', '#F59E0B']
      });
    } else {
      playSoundEffect('wrong');
    }

    // Save answer record
    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        selected: selectedOption,
        correct: currentQ.correctIndex,
        isCorrect,
        explanation: currentQ.explanation
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      playSoundEffect('victory');
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#4B9F84', '#10B981', '#F59E0B', '#3B82F6']
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setIsQuizCompleted(false);
  };

  // Performance Evaluation calculation
  const totalQuestions = QUIZ_QUESTIONS.length;
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getBadgeInfo = () => {
    if (percentage >= 85) {
      return {
        title: "Master Kimia Hidrokarbon 🏆",
        desc: "Luar biasa! Pemahamanmu mengenai Alkana, Alkena, Alkuna, serta Isomer sangat mendalam.",
        badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300"
      };
    } else if (percentage >= 60) {
      return {
        title: "Peneliti Berbakat 🧪",
        desc: "Bagus sekali! Kamu sudah menguasai sebagian besar konsep penting tata nama dan struktur.",
        badgeColor: "bg-amber-100 text-amber-900 border-amber-300"
      };
    } else {
      return {
        title: "Calon Ahli Kimia 🔬",
        desc: "Tetap semangat! Pelajari kembali materi modul dan bentuk molekul di Lab 3D untuk memperkuat dasar.",
        badgeColor: "bg-stone-100 text-stone-800 border-stone-300"
      };
    }
  };

  return (
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          Kuis Interaktif & Gamifikasi
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight font-heading">
          Uji Pemahaman Hidrokarbon
        </h2>
        <p className="mt-3 text-base text-stone-600">
          Uji ketangkasan konsep tata nama IUPAC, ikatan jenuh/tak jenuh, dan isomer dengan animasi feedback langsung serta poin skor!
        </p>
      </div>

      {/* Main Quiz Box */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden">
        
        {/* Top Gamification Bar (Status, Score, Streak, Sound) */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between gap-4">
          
          {/* Question Counter & Progress */}
          <div className="flex items-center gap-3">
            <span className="font-heading font-bold text-sm sm:text-base text-stone-800">
              Soal {currentQuestionIndex + 1} <span className="text-stone-400 font-normal">/ {totalQuestions}</span>
            </span>
            <div className="w-24 sm:w-36 h-2 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Gamified stats: Score & Streak */}
          <div className="flex items-center gap-3">
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-1 rounded-xl text-xs font-bold animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{streak}x Streak!</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-emerald-100/80 text-emerald-900 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold">
              <Trophy className="w-4 h-4 text-emerald-700" />
              <span>{score} Pts</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
            </button>
          </div>
        </div>

        {/* Content Area: Quiz Playing OR Completed Screen */}
        {!isQuizCompleted ? (
          <div className="p-6 sm:p-8">
            
            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-heading leading-relaxed mb-6">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let cardStyle = "bg-[#FAF8F5] border-stone-200 text-stone-700 hover:bg-emerald-50/60 hover:border-emerald-300";

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    cardStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-500/30";
                  } else if (isSelected && !isCorrect) {
                    cardStyle = "bg-rose-100 border-rose-400 text-rose-950 ring-2 ring-rose-400/30";
                  } else {
                    cardStyle = "bg-stone-50 border-stone-200 text-stone-400 opacity-60";
                  }
                } else if (isSelected) {
                  cardStyle = "bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold ring-2 ring-emerald-500/20";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected 
                          ? "bg-emerald-600 text-white" 
                          : "bg-white border border-stone-300 text-stone-600"
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Explanation Alert if answered */}
            {isAnswerSubmitted && (
              <div className={`p-4 rounded-2xl mb-6 border animate-fadeIn text-xs sm:text-sm ${
                selectedOption === currentQ.correctIndex 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-950"
              }`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Jawaban Tepat! (+100 Poin)</span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-4 h-4 text-rose-600" />
                      <span>Belum Tepat! Simak Pembahasan:</span>
                    </>
                  )}
                </div>
                <div className="text-stone-700 leading-relaxed mt-1">
                  {currentQ.explanation}
                </div>
              </div>
            )}

            {/* Action Button: Check Answer OR Next */}
            <div className="flex items-center justify-end">
              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`px-6 py-3 rounded-xl font-heading font-bold text-sm sm:text-base transition-all cursor-pointer ${
                    selectedOption !== null
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25"
                      : "bg-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  Kirim Jawaban
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl font-heading font-bold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>{currentQuestionIndex < totalQuestions - 1 ? "Soal Berikutnya" : "Lihat Hasil Akhir"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Quiz Results Completion Card */
          <div className="p-6 sm:p-10 text-center animate-fadeIn">
            
            <div className="w-20 h-20 bg-emerald-100 rounded-3xl mx-auto flex items-center justify-center text-emerald-700 shadow-inner mb-4">
              <Award className="w-10 h-10" />
            </div>

            {(() => {
              const badge = getBadgeInfo();
              return (
                <div className="max-w-md mx-auto">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-3 ${badge.badgeColor}`}>
                    {badge.title}
                  </span>
                  <h3 className="text-3xl font-extrabold text-stone-900 font-heading">
                    Kuis Selesai!
                  </h3>
                  <p className="mt-2 text-stone-600 text-sm">
                    {badge.desc}
                  </p>
                </div>
              );
            })()}

            {/* Score & Stat Summary */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto my-6">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="text-xs text-stone-500">Skor Total</div>
                <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-0.5">{score}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="text-xs text-stone-500">Akurasi</div>
                <div className="text-2xl font-extrabold text-stone-800 font-mono mt-0.5">{percentage}%</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div className="text-xs text-stone-500">Benar / Total</div>
                <div className="text-2xl font-extrabold text-stone-800 font-mono mt-0.5">{correctCount}/{totalQuestions}</div>
              </div>
            </div>

            {/* Question Review Accordion */}
            <div className="text-left max-w-xl mx-auto mt-8 border-t border-stone-100 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-700 mb-3">
                Ringkasan Evaluasi Soal:
              </h4>
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {userAnswers.map((ans, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs flex items-start gap-2.5">
                    {ans.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-stone-800">
                        {idx + 1}. {ans.question}
                      </div>
                      <div className="text-stone-500 mt-1">
                        {ans.isCorrect ? (
                          <span className="text-emerald-700 font-medium">Benar!</span>
                        ) : (
                          <span>Kunci: <strong className="text-stone-700">{QUIZ_QUESTIONS[idx].options[ans.correct]}</strong></span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart Button */}
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={handleRestartQuiz}
                className="px-6 py-3 rounded-xl font-heading font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

