import React from 'react';
import {
  Presentation,
  PenTool,
  Search,
  Image as ImageIcon,
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { INITIAL_TASKS } from '../data/tasks';
import { SavedRoute, TaskCategory } from '../types';

interface ScreenHomeProps {
  selectedTaskId: TaskCategory | null;
  onSelectTask: (taskId: TaskCategory) => void;
  onProceed: () => void;
  savedRoutes: SavedRoute[];
  onOpenSavedRoute: (route: SavedRoute) => void;
  onViewAllSavedRoutes: () => void;
  onOpenPricing: () => void;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  selectedTaskId,
  onSelectTask,
  onProceed,
  savedRoutes,
  onOpenSavedRoute,
  onViewAllSavedRoutes,
  onOpenPricing
}) => {
  // Mapping of icons
  const getTaskIcon = (id: TaskCategory) => {
    switch (id) {
      case 'presentation':
        return <Presentation className="w-6 h-6 text-teal-700" />;
      case 'writing':
        return <PenTool className="w-6 h-6 text-indigo-700" />;
      case 'research':
        return <Search className="w-6 h-6 text-amber-700" />;
      case 'images':
        return <ImageIcon className="w-6 h-6 text-rose-700" />;
      case 'study':
        return <GraduationCap className="w-6 h-6 text-blue-700" />;
      default:
        return <Presentation className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/70 rounded-full px-3.5 py-1">
          <span>Rutas prácticas para principiantes</span>
          <span aria-hidden="true">·</span>
          <span>Sin suscripciones ni jerga técnica</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900" style={{ textWrap: 'balance' }}>
          ¿Qué quieres hacer con IA?
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Cuéntanos qué necesitas conseguir y te ayudaremos a encontrar una ruta práctica para empezar: con instrucciones listas para copiar y una checklist paso a paso.
        </p>
      </div>

      {/* Main Grid: 5 Initial Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-slate-700">
            Elige una tarea para comenzar:
          </h2>
          <span className="text-xs text-slate-500">
            5 tareas preparadas con instrucciones probadas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {INITIAL_TASKS.map((task) => {
            const isSelected = selectedTaskId === task.id;
            return (
              <div
                key={task.id}
                onClick={() => onSelectTask(task.id)}
                className={`group relative rounded-xl p-5 sm:p-6 transition-all cursor-pointer border text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-teal-600 ring-2 ring-teal-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getTaskIcon(task.id)}
                    </div>
                    {task.highlighted && (
                      <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                        Prioridad recomendada
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {task.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{task.estimatedMinutes} min</span>
                  </div>

                  <span
                    className={`font-semibold flex items-center gap-1 transition-colors ${
                      isSelected ? 'text-teal-700' : 'text-slate-700 group-hover:text-slate-900'
                    }`}
                  >
                    <span>{isSelected ? 'Seleccionada' : 'Seleccionar'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Bar below tasks */}
        <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm font-semibold text-slate-100">
              {selectedTaskId
                ? `Tarea lista: ${INITIAL_TASKS.find((t) => t.id === selectedTaskId)?.title}`
                : 'Selecciona una tarea de arriba para preparar tu guía'}
            </p>
            <p className="text-xs text-slate-400">
              Te haremos 4 preguntas rápidas para adaptar el contenido a tu caso.
            </p>
          </div>

          <button
            onClick={onProceed}
            disabled={!selectedTaskId}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap shrink-0 ${
              selectedTaskId
                ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Encontrar mi ruta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mis Últimas Rutas (Acceso Rápido) */}
      {savedRoutes.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800">
              <Bookmark className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold">Mis últimas rutas consultadas</h2>
            </div>
            <button
              onClick={onViewAllSavedRoutes}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Ver todas ({savedRoutes.length}) →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedRoutes.slice(0, 3).map((r) => {
              const completed = r.completedChecklistIds.length;
              const total = r.guide.checklist.length;
              const pct = Math.round((completed / total) * 100);

              return (
                <div
                  key={r.id}
                  onClick={() => onOpenSavedRoute(r)}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all text-left flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>{r.createdAt}</span>
                      <span className="font-medium text-slate-600">{r.taskTitle}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                      {r.guide.objective}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1 text-slate-600">
                      <span>Progreso de checklist</span>
                      <span className="font-semibold text-slate-800">{completed}/{total} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-600 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Value Proposition & Clarification Section (Anti-Chatbot & 9 USD Hypothesis) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-slate-200">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No es otro chatbot</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No tienes que adivinar qué preguntarle a una pantalla en blanco. Te entregamos un procedimiento probado, ordenado en 3 pasos lógicos.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Contenido listo para copiar</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instrucciones redactadas para evitar respuestas robóticas o alucinadas. Copias, pegas y obtienes el resultado deseado en la herramienta adecuada.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Checklist de comprobación</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Avanza paso a paso sabiendo qué has completado y qué te falta. Tus rutas y avances quedan guardados en tu navegador sin crear cuentas.
          </p>
        </div>
      </div>

      {/* Commercial Model Card */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Modelo de cobro transparente</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Acceso completo por 9 USD · Pago único
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Sin suscripciones mensuales de 20 USD ni costes ocultos. Diseñado para ahorrarte semanas de prueba y error aprendiendo a usar IA.
          </p>
        </div>

        <button
          onClick={onOpenPricing}
          className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-xs"
        >
          Ver detalles del modelo
        </button>
      </div>
    </div>
  );
};
