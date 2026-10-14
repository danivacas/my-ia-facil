import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Share2,
  Sparkles
} from 'lucide-react';
import { RouteGuide } from '../types';

interface ScreenGuideProps {
  guide: RouteGuide;
  completedChecklistIds: string[];
  onToggleChecklist: (itemId: string) => void;
  onSaveRoute: () => void;
  isRouteSaved: boolean;
  onBackToCustomize: () => void;
  onBackToHome: () => void;
  onViewSavedRoutes: () => void;
}

export const ScreenGuide: React.FC<ScreenGuideProps> = ({
  guide,
  completedChecklistIds,
  onToggleChecklist,
  onSaveRoute,
  isRouteSaved,
  onBackToCustomize,
  onBackToHome,
  onViewSavedRoutes
}) => {
  const [copied, setCopied] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(guide.step2.copyablePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleSaveClick = () => {
    onSaveRoute();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const completedCount = completedChecklistIds.length;
  const totalChecklist = guide.checklist.length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBackToCustomize}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ajustar respuestas</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isRouteSaved
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-white border-slate-300 hover:border-slate-400 text-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-teal-600" />
            <span>{isRouteSaved ? 'Ruta guardada' : 'Guardar mi ruta'}</span>
          </button>

          <button
            onClick={onViewSavedRoutes}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
          >
            Mis rutas
          </button>
        </div>
      </div>

      {saveToast && (
        <div className="bg-teal-700 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Ruta guardada localmente con éxito. Podrás consultarla cuando quieras desde «Mis rutas».</span>
          </div>
          <button
            onClick={() => setSaveToast(false)}
            className="text-teal-200 hover:text-white ml-2 text-xs"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Hero Result Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
          <span>TU RUTA RECOMENDADA</span>
          <span aria-hidden="true">·</span>
          <span>Procedimiento práctico sin suscripción</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {guide.taskTitle}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
          {guide.objective}
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-lg text-xs sm:text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">Por qué esta ruta: </span>
          {guide.whyThisRoute}
        </div>

        {/* Recommended Tool Card */}
        <div className="pt-2">
          <div className="p-4 rounded-lg bg-teal-50/60 border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Herramienta recomendada:
                </span>
                <span className="text-xs font-semibold bg-white text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                  {guide.recommendedTool.tierInfo}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {guide.recommendedTool.name}
              </p>
              <p className="text-xs text-slate-600">
                {guide.recommendedTool.why}
              </p>
            </div>

            <div className="shrink-0 text-xs text-teal-800 font-mono bg-white px-2.5 py-1 rounded border border-teal-200/70">
              {guide.recommendedTool.webHint}
            </div>
          </div>
        </div>
      </div>

      {/* PASO 1 — Prepara la información */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
            01
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {guide.step1.title}
            </h2>
            <p className="text-xs text-slate-500">{guide.step1.summary}</p>
          </div>
        </div>

        <ul className="space-y-2.5 pt-2">
          {guide.step1.items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {guide.step1.proTip && (
          <div className="flex items-start gap-2.5 p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-900">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Consejo de oro: </span>
              <span>{guide.step1.proTip}</span>
            </div>
          </div>
        )}
      </section>

      {/* PASO 2 — Sigue las instrucciones (Copyable Prompt) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
              02
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {guide.step2.title}
              </h2>
              <p className="text-xs text-slate-500">{guide.step2.summary}</p>
            </div>
          </div>

          <button
            onClick={handleCopyPrompt}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-xs ${
              copied
                ? 'bg-teal-700 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Instrucciones copiadas!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar instrucciones</span>
              </>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-600">
          {guide.step2.promptExplanation}
        </div>

        {/* Variables guidance */}
        {guide.step2.variablesToFill.length > 0 && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="text-xs font-semibold text-slate-700">
              Sustituye los datos entre corchetes con tu caso real:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {guide.step2.variablesToFill.map((v, i) => (
                <div key={i} className="text-slate-600">
                  <code className="text-teal-800 font-semibold">{v.key}</code>
                  <span className="block text-slate-500 text-[11px] mt-0.5">Ej: {v.example}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prompt Code Block */}
        <div className="relative">
          <pre className="p-4 sm:p-5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {guide.step2.copyablePrompt}
          </pre>
        </div>
      </section>

      {/* PASO 3 — Revisa el resultado */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
            03
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {guide.step3.title}
            </h2>
            <p className="text-xs text-slate-500">{guide.step3.summary}</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {guide.step3.checks.map((chk, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>{chk}</span>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-lg text-xs text-rose-900">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Qué evitar: </span>
            <span>{guide.step3.whatToAvoid}</span>
          </div>
        </div>
      </section>

      {/* TU CHECKLIST INTERACTIVA */}
      <section className="bg-white border-2 border-teal-600/30 rounded-xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
              <span>TU CHECKLIST DE RESULTADOS</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Comprueba tus avances
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-700">
              {completedCount} de {totalChecklist} pasos ({progressPercent}%)
            </span>
            <div className="w-36 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden ml-auto">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Marca los pasos a medida que los vayas ejecutando. Tus casillas marcadas se guardan de forma automática.
        </p>

        <div className="space-y-3">
          {guide.checklist.map((item) => {
            const isDone = completedChecklistIds.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex items-start gap-3.5 p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isDone
                    ? 'bg-teal-50/40 border-teal-200 text-slate-800'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggleChecklist(item.id)}
                  className="w-4 h-4 mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500 focus:ring-offset-0 cursor-pointer"
                />
                <div className="space-y-0.5 flex-1">
                  <div className={`text-xs sm:text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.text}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.detail}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Siguiente paso recomendado */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 flex items-start gap-3">
        <div className="w-6 h-6 rounded bg-teal-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
          →
        </div>
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Tu siguiente acción inmediata
          </h3>
          <p className="text-xs sm:text-sm text-slate-700">
            {guide.nextAction}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <button
          onClick={onBackToHome}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Volver al inicio
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleCopyPrompt}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <Copy className="w-4 h-4 text-slate-600" />
            <span>{copied ? '¡Copiado!' : 'Copiar instrucciones'}</span>
          </button>

          <button
            onClick={onViewSavedRoutes}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Ver mis rutas guardadas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
