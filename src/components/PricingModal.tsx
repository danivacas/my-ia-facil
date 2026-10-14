import React from 'react';
import { X, Check, ShieldCheck, Zap, HelpCircle } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Ficha de producto y modelo de cobro</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            ¿Por qué un pago único de 9 USD?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Nuestra propuesta no es venderte otra suscripción mensual de 20 USD ni un curso teórico de 40 horas.
          </p>
        </div>

        {/* Pricing Comparison Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                9 USD
              </span>
              <span className="text-xs font-semibold text-slate-500 ml-2">
                Pago único · Acceso completo
              </span>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-100/70 px-2.5 py-1 rounded">
              Sin cuotas recurrentes
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            «No estás pagando por otra lista de herramientas. Estás pagando por una forma más sencilla de saber exactamente qué hacer y cómo hacerlo».
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-3 text-xs sm:text-sm">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
            Qué incluye la versión de IA Fácil:
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Rutas interactivas para las 5 tareas iniciales más frecuentes (Presentaciones, Textos, Investigación, Imágenes y Estudio).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Plantillas de instrucciones con variables reales listas para copiar y pegar en herramientas 100% gratuitas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Checklists de comprobación que guardan tus progresos directamente en tu navegador sin requerir registros pesados.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>Filtros anti-errores: pautas concretas para evitar alucinaciones, lenguaje robótico y aberraciones visuales.</span>
            </li>
          </ul>
        </div>

        {/* Strategy explanation note */}
        <div className="p-4 rounded-lg bg-slate-100 text-xs text-slate-600 space-y-1">
          <span className="font-bold text-slate-800">Nota de transparencia: </span>
          <p>
            No mostramos precios ficticios tachados (como «19 USD tachados»). El precio es de 9 USD directos mientras validamos la utilidad real con los primeros usuarios.
          </p>
        </div>

        {/* Modal footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-xs"
          >
            Entendido, continuar probando la mini-app
          </button>
        </div>
      </div>
    </div>
  );
};
