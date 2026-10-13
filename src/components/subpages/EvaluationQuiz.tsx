import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircle2, XCircle, RotateCcw, Award, ChevronRight } from 'lucide-react';

interface EvaluationQuizProps {
  subtopicId: string;
  questions: QuizQuestion[];
  savedScore?: { score: number; total: number; timestamp: string };
  onScoreSubmit: (subtopicId: string, score: number, total: number) => void;
}

export default function EvaluationQuiz({
  subtopicId,
  questions,
  savedScore,
  onScoreSubmit,
}: EvaluationQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedScore);
  const [currentScore, setCurrentScore] = useState<number>(savedScore ? savedScore.score : 0);

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx,
    });
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setCurrentScore(score);
    setIsSubmitted(true);
    onScoreSubmit(subtopicId, score, questions.length);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);
  const percentage = Math.round((currentScore / questions.length) * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h4 className="font-bold text-sm text-slate-900">
            Evaluasi Pemahaman &amp; Uji Konsep Mandiri ({questions.length} Soal)
          </h4>
        </div>
        {isSubmitted && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              Skor: {currentScore} / {questions.length} ({percentage}%)
            </span>
            <button
              onClick={handleRetry}
              className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis
            </button>
          </div>
        )}
      </div>

      <div className="p-5 space-y-6">
        {questions.map((q, qIdx) => {
          const userAns = selectedAnswers[qIdx];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div key={q.id} className="space-y-3 pb-5 border-b border-slate-100 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <h5 className="font-semibold text-slate-900 text-xs sm:text-sm leading-relaxed">
                    {q.question}
                  </h5>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-8">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = userAns === optIdx;
                  let optStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                  if (isSubmitted) {
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold';
                    } else if (isThisSelected && !isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                    } else {
                      optStyle = 'border-slate-200 bg-slate-50 opacity-50 text-slate-500';
                    }
                  } else if (isThisSelected) {
                    optStyle = 'border-blue-600 bg-blue-50/70 text-blue-950 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs flex items-start gap-3 transition-colors ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback and explanation after submit */}
              {isSubmitted && (
                <div
                  className={`mt-3 ml-8 p-3 rounded-lg text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-amber-600" />
                    )}
                    <span>{isCorrect ? 'Jawaban Benar!' : 'Jawaban Kurang Tepat'}</span>
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Submit button bar */}
        {!isSubmitted && (
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {allAnswered
                ? 'Semua soal telah terjawab. Klik tombol untuk memeriksa hasilmu.'
                : `Masih ada ${questions.length - Object.keys(selectedAnswers).length} soal belum terjawab.`}
            </span>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              Kumpulkan &amp; Periksa Jawaban <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
