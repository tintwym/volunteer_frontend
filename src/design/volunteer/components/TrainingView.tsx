'use client';
// @ts-nocheck

import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Award, 
  FileText, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';
import { TrainingCourse } from '../types';

interface TrainingViewProps {
  courses: TrainingCourse[];
  onCompleteCourse: (courseId: string, score: number) => void;
  onOpenCertificate: (certTitle: string) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  courses,
  onCompleteCourse,
  onOpenCertificate
}) => {
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'materials' | 'quiz'>('materials');

  const handleSelectCourse = (course: TrainingCourse) => {
    setSelectedCourse(course);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setActiveTab(course.status === 'Completed' ? 'quiz' : 'materials');
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    if (!selectedCourse) return;
    let correct = 0;
    selectedCourse.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / selectedCourse.quiz.length) * 100);
    setQuizScore(scorePct);
    setQuizSubmitted(true);

    if (scorePct >= selectedCourse.passingScore) {
      onCompleteCourse(selectedCourse.id, scorePct);
    }
  };

  const completedCount = courses.filter(c => c.status === 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs tracking-wider uppercase mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Section 3.9 • Volunteer Compliance & Skills</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Training & Certifications</h1>
            <p className="text-sm text-slate-600 mt-1">
              Complete mandatory orientations, review safety guidelines, and pass interactive quizzes to qualify for shifts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-right">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Completed Modules</span>
              <span className="text-lg font-bold text-slate-900">{completedCount} / {courses.length} Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const isCompleted = course.status === 'Completed';
          const isInProgress = course.status === 'In Progress';
          const isNotStarted = course.status === 'Not Started';

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              onClick={() => handleSelectCourse(course)}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>

                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isCompleted 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : isInProgress 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                    {isInProgress && <Clock className="w-3 h-3" />}
                    {course.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.duration}</span>
                  <span className="text-slate-300">•</span>
                  <span>Pass: {course.passingScore}%</span>
                </div>

                <button className="text-xs font-semibold text-emerald-700 flex items-center gap-1 hover:text-emerald-800">
                  <span>{isCompleted ? 'Review Quiz' : 'Launch Course'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Course Interactive Learning Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedCourse.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {selectedCourse.duration}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedCourse.title}</h2>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-2 mt-4 pb-2 border-b border-slate-100">
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'materials'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. Learning Materials & Handouts</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>2. Comprehension Quiz ({selectedCourse.quiz.length} Questions)</span>
              </button>
            </div>

            {/* TAB 1: Materials */}
            {activeTab === 'materials' && (
              <div className="mt-4 space-y-4 text-xs text-slate-700">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Course Overview</h4>
                  <p className="leading-relaxed text-slate-600">{selectedCourse.description}</p>
                </div>

                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Required Reading Handouts</h4>
                <div className="space-y-2">
                  {selectedCourse.materials.map((mat, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          {mat.title}
                        </span>
                        <span className="text-[11px] text-slate-400">{mat.readTime}</span>
                      </div>
                      <p className="text-slate-600 pl-5">{mat.summary}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Proceed to Assessment Quiz</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Quiz */}
            {activeTab === 'quiz' && (
              <div className="mt-4 space-y-6 text-xs text-slate-800">
                {quizSubmitted && quizScore !== null && (
                  <div className={`p-4 rounded-xl border flex items-center justify-between ${
                    quizScore >= selectedCourse.passingScore
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-red-50 border-red-300 text-red-900'
                  }`}>
                    <div>
                      <span className="font-bold text-sm block">
                        {quizScore >= selectedCourse.passingScore ? '🎉 Quiz Passed!' : '⚠️ Passing Score Not Reached'}
                      </span>
                      <p className="text-xs mt-0.5">
                        Your Score: <strong>{quizScore}%</strong> (Passing Requirement: {selectedCourse.passingScore}%)
                      </p>
                    </div>

                    {quizScore < selectedCourse.passingScore && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                          setQuizScore(null);
                        }}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg font-semibold flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Retry
                      </button>
                    )}
                  </div>
                )}

                {/* Questions */}
                <div className="space-y-5">
                  {selectedCourse.quiz.map((q, idx) => {
                    const selectedOpt = quizAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctAnswer;

                    return (
                      <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                        <div className="font-bold text-slate-900 text-xs flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-[10px] shrink-0 font-mono">
                            {idx + 1}
                          </span>
                          <span>{q.question}</span>
                        </div>

                        {/* Options */}
                        <div className="space-y-1.5 pl-7">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selectedOpt === optIdx;
                            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                            if (quizSubmitted) {
                              if (optIdx === q.correctAnswer) {
                                btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold';
                              } else if (isChosen && !isCorrect) {
                                btnStyle = 'bg-red-100 border-red-400 text-red-900';
                              }
                            } else if (isChosen) {
                              btnStyle = 'bg-emerald-600 text-white font-semibold border-emerald-600';
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleSelectOption(q.id, optIdx)}
                                className={`w-full text-left p-2.5 rounded-lg border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && optIdx === q.correctAnswer && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation on submit */}
                        {quizSubmitted && (
                          <div className="pl-7 pt-1 text-[11px] text-slate-500 italic">
                            <strong>Note:</strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Grade Action */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={() => setActiveTab('materials')}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    ← Review Materials
                  </button>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleGradeQuiz}
                      disabled={Object.keys(quizAnswers).length < selectedCourse.quiz.length}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                    >
                      Submit Quiz for Grading
                    </button>
                  ) : (
                    selectedCourse.status === 'Completed' && (
                      <button
                        onClick={() => onOpenCertificate(selectedCourse.title)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Award className="w-4 h-4" />
                        <span>Download Course Certificate</span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
