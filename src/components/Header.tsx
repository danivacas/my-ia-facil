import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'home' | 'customize' | 'guide' | 'my-routes';
  savedRoutesCount: number;
  onNavigate: (screen: 'home' | 'customize' | 'guide' | 'my-routes') => void;
  onStartNew: () => void;
  onOpenPricing: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  savedRoutesCount,
  onNavigate,
  onStartNew,
  onOpenPricing
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-base shadow-sm">
            IA
          </span>
          <span>IA Fácil</span>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              currentScreen === 'home' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            Explorar tareas
          </button>
          <button
            onClick={() => onNavigate('my-routes')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentScreen === 'my-routes' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            <span>Mis rutas</span>
            {savedRoutesCount > 0 && (
              <span className="text-xs font-semibold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
                {savedRoutesCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenPricing}
            className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
          >
            Modelo 9 USD
          </button>
        </nav>

        {/* Zone 3: 1 Primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile shortcuts */}
          <button
            onClick={() => onNavigate('my-routes')}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 relative"
            title="Mis rutas"
          >
            <Bookmark className="w-5 h-5" />
            {savedRoutesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-600"></span>
            )}
          </button>
          <button
            onClick={onStartNew}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            Nueva ruta
          </button>
        </div>
      </div>
    </header>
  );
};
