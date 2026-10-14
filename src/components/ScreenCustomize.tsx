import React from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles, HelpCircle } from 'lucide-react';
import { INITIAL_TASKS } from '../data/tasks';
import { TaskCategory, UserAnswers } from '../types';

interface ScreenCustomizeProps {
  taskId: TaskCategory;
  answers: UserAnswers;
  onAnswerChange: (questionId: string, optionId: string) => void;
  onBack: () => void;
  onGenerateGuide: () => void;
}

export const ScreenCustomize: React.FC<ScreenCustomizeProps> = ({
  taskId,
  answers,
  onAnswerChange,
  onBack,
  onGenerateGuide
}) => {
  const currentTask = INITIAL_TASKS.find((t) => t.id === taskId) || INITIAL_TASKS[0];
  const questions = currentTask.questions;

  // Validation
  const answeredCount = questions.filter((q) => Boolean(answers[q.id])).length;
  const isComplete = answeredCount === questions.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Navigation & Context */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al selector de tareas</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          Paso 2 de 3 · <span className="text-slate-800 font-semibold">Personalización</span>
        </div>
      </div>

      {/* Screen Title & Task Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/60 rounded px-2.5 py-0.5">
          <span>Tarea seleccionada: {currentTask.title}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Personaliza tu ruta
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Responde estas {questions.length} preguntas breves. Utilizaremos tus respuestas para seleccionar las herramientas idóneas, redactar las instrucciones preparadas y ajustar la checklist.
        </p>
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {questions.map((question, qIdx) => {
          const selectedOptionId = answers[question.id];

          return (
            <div
              key={question.id}
              className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-slate-900">
                    {question.label}
                  </h3>
                  {selectedOptionId && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      <Check className="w-3 h-3" />
                      <span>Respondida</span>
                    </span>
                  )}
                </div>
                {question.description && (
                  <p className="text-xs text-slate-500">{question.description}</p>
                )}
              </div>

              {/* Options Radio List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map((option) => {
                  const isChecked = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => onAnswerChange(question.id, option.id)}
                      className={`text-left p-3.5 rounded-lg border transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-500/20 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'border-teal-600 bg-teal-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold">{option.label}</div>
                        {option.detail && (
                          <div className="text-xs text-slate-500 leading-normal">
                            {option.detail}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky-like Action Bar */}
      <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-sm font-semibold text-slate-100">
            {isComplete
              ? 'Todas las preguntas respondidas'
              : `Has respondido ${answeredCount} de ${questions.length} preguntas`}
          </p>
          <p className="text-xs text-slate-400">
            {isComplete
              ? 'Listo para preparar tu ruta de 3 pasos y la checklist de comprobación.'
              : 'Selecciona una opción en cada bloque para adaptar la guía a tu situación.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={onGenerateGuide}
            disabled={!isComplete}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              isComplete
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Preparar mi guía</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
