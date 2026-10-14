import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScreenHome } from './components/ScreenHome';
import { ScreenCustomize } from './components/ScreenCustomize';
import { ScreenGuide } from './components/ScreenGuide';
import { ScreenMyRoutes } from './components/ScreenMyRoutes';
import { PricingModal } from './components/PricingModal';
import { Footer } from './components/Footer';
import { TaskCategory, UserAnswers, RouteGuide, SavedRoute } from './types';
import { generateGuide } from './utils/guideGenerator';
import {
  getSavedRoutes,
  saveRoute,
  updateRouteChecklist,
  deleteSavedRoute
} from './utils/storage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'customize' | 'guide' | 'my-routes'>('home');
  const [selectedTaskId, setSelectedTaskId] = useState<TaskCategory | null>('presentation'); // Default to presentation as priority 1
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [currentGuide, setCurrentGuide] = useState<RouteGuide | null>(null);
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);
  const [activeRouteId, setActiveRouteId] = useState<string | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  // Load saved routes on mount
  useEffect(() => {
    const loaded = getSavedRoutes();
    setSavedRoutes(loaded);
  }, []);

  // Handle task selection
  const handleSelectTask = (taskId: TaskCategory) => {
    if (selectedTaskId !== taskId) {
      setSelectedTaskId(taskId);
      setAnswers({}); // Reset answers when changing task
    }
  };

  // Move from Home to Customize
  const handleProceedToCustomize = () => {
    if (!selectedTaskId) return;
    setCurrentScreen('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Answer change in Customize
  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  // Generate guide from answers
  const handleGenerateGuide = () => {
    if (!selectedTaskId) return;
    const guide = generateGuide(selectedTaskId, answers);
    setCurrentGuide(guide);
    setCompletedChecklistIds([]);

    // Automatically save to local storage as consultation history
    const saved = saveRoute(
      selectedTaskId,
      guide.taskTitle,
      answers,
      guide,
      undefined,
      []
    );
    setActiveRouteId(saved.id);
    setSavedRoutes(getSavedRoutes());

    setCurrentScreen('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle checklist item
  const handleToggleChecklist = (itemId: string) => {
    const updatedIds = completedChecklistIds.includes(itemId)
      ? completedChecklistIds.filter((id) => id !== itemId)
      : [...completedChecklistIds, itemId];

    setCompletedChecklistIds(updatedIds);

    if (activeRouteId) {
      const updatedRoutes = updateRouteChecklist(activeRouteId, updatedIds);
      setSavedRoutes(updatedRoutes);
    }
  };

  // Explicit save action
  const handleSaveCurrentRoute = () => {
    if (!selectedTaskId || !currentGuide) return;
    const saved = saveRoute(
      selectedTaskId,
      currentGuide.taskTitle,
      answers,
      currentGuide,
      activeRouteId || undefined,
      completedChecklistIds
    );
    setActiveRouteId(saved.id);
    setSavedRoutes(getSavedRoutes());
  };

  // Open existing saved route
  const handleOpenSavedRoute = (route: SavedRoute) => {
    setSelectedTaskId(route.taskId);
    setAnswers(route.userAnswers);
    setCurrentGuide(route.guide);
    setCompletedChecklistIds(route.completedChecklistIds || []);
    setActiveRouteId(route.id);
    setCurrentScreen('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete saved route
  const handleDeleteRoute = (routeId: string) => {
    const updated = deleteSavedRoute(routeId);
    setSavedRoutes(updated);
    if (activeRouteId === routeId) {
      setActiveRouteId(null);
    }
  };

  // Start new route
  const handleStartNew = () => {
    setSelectedTaskId('presentation');
    setAnswers({});
    setCurrentGuide(null);
    setActiveRouteId(null);
    setCompletedChecklistIds([]);
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header
        currentScreen={currentScreen}
        savedRoutesCount={savedRoutes.length}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartNew={handleStartNew}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      <main className="flex-1">
        {currentScreen === 'home' && (
          <ScreenHome
            selectedTaskId={selectedTaskId}
            onSelectTask={handleSelectTask}
            onProceed={handleProceedToCustomize}
            savedRoutes={savedRoutes}
            onOpenSavedRoute={handleOpenSavedRoute}
            onViewAllSavedRoutes={() => setCurrentScreen('my-routes')}
            onOpenPricing={() => setIsPricingModalOpen(true)}
          />
        )}

        {currentScreen === 'customize' && selectedTaskId && (
          <ScreenCustomize
            taskId={selectedTaskId}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onBack={() => setCurrentScreen('home')}
            onGenerateGuide={handleGenerateGuide}
          />
        )}

        {currentScreen === 'guide' && currentGuide && (
          <ScreenGuide
            guide={currentGuide}
            completedChecklistIds={completedChecklistIds}
            onToggleChecklist={handleToggleChecklist}
            onSaveRoute={handleSaveCurrentRoute}
            isRouteSaved={Boolean(activeRouteId)}
            onBackToCustomize={() => setCurrentScreen('customize')}
            onBackToHome={() => setCurrentScreen('home')}
            onViewSavedRoutes={() => setCurrentScreen('my-routes')}
          />
        )}

        {currentScreen === 'my-routes' && (
          <ScreenMyRoutes
            savedRoutes={savedRoutes}
            onOpenRoute={handleOpenSavedRoute}
            onDeleteRoute={handleDeleteRoute}
            onNewTask={handleStartNew}
          />
        )}
      </main>

      <Footer
        onNavigateHome={() => setCurrentScreen('home')}
        onNavigateMyRoutes={() => setCurrentScreen('my-routes')}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
      />
    </div>
  );
}
