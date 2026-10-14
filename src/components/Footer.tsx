import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateMyRoutes: () => void;
  onOpenPricing: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateMyRoutes,
  onOpenPricing
}) => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <p className="font-semibold text-slate-800">
            IA Fácil — Guías prácticas para principiantes
          </p>
          <p className="text-slate-500">
            Convierte cualquier tarea en una ruta de trabajo paso a paso sin suscripciones.
          </p>
        </div>

        <div className="flex items-center gap-6 font-medium text-slate-600">
          <button
            onClick={onNavigateHome}
            className="hover:text-slate-900 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={onNavigateMyRoutes}
            className="hover:text-slate-900 transition-colors"
          >
            Mis rutas
          </button>
          <button
            onClick={onOpenPricing}
            className="hover:text-slate-900 transition-colors"
          >
            Modelo 9 USD
          </button>
        </div>
      </div>
    </footer>
  );
};
