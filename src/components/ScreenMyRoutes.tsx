import React from 'react';
import {
  ArrowLeft,
  Trash2,
  ExternalLink,
  Plus,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SavedRoute } from '../types';

interface ScreenMyRoutesProps {
  savedRoutes: SavedRoute[];
  onOpenRoute: (route: SavedRoute) => void;
  onDeleteRoute: (routeId: string) => void;
  onNewTask: () => void;
}

export const ScreenMyRoutes: React.FC<ScreenMyRoutesProps> = ({
  savedRoutes,
  onOpenRoute,
  onDeleteRoute,
  onNewTask
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onNewTask}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </button>

        <button
          onClick={onNewTask}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva tarea</span>
        </button>
      </div>

      {/* Screen Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Mis rutas guardadas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Recupera tus guías prácticas consultadas y continúa el avance de tus checklists donde lo dejaste.
        </p>
      </div>

      {/* Empty State vs List */}
      {savedRoutes.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Aún no tienes rutas guardadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cuando consultes una guía personalizada (por ejemplo, para crear una presentación o redactar un texto), podrás guardarla aquí para tenerla siempre a mano.
            </p>
          </div>
          <button
            onClick={onNewTask}
            className="px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 shadow-xs"
          >
            <span>Crear mi primera ruta</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedRoutes.map((route) => {
            const completedCount = route.completedChecklistIds.length;
            const totalCount = route.guide.checklist.length;
            const pct = Math.round((completedCount / totalCount) * 100);

            return (
              <div
                key={route.id}
                className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                      {route.taskTitle}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {route.guide.objective}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{route.createdAt}</span>
                    </span>
                    <button
                      onClick={() => onDeleteRoute(route.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded hover:bg-rose-50"
                      title="Eliminar esta ruta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar and details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Estado de la checklist:</span>
                    <span className="font-mono text-slate-800 font-bold">
                      {completedCount} de {totalCount} pasos ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Card footer actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <span className="text-slate-500">
                    Herramienta: <strong className="text-slate-700">{route.guide.recommendedTool.name}</strong>
                  </span>

                  <button
                    onClick={() => onOpenRoute(route)}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all inline-flex items-center gap-1.5"
                  >
                    <span>Abrir guía completa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
