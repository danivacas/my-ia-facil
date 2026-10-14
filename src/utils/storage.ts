import { SavedRoute, RouteGuide, TaskCategory, UserAnswers } from '../types';

const STORAGE_KEY = 'ia_facil_saved_routes_v1';

export function getSavedRoutes(): SavedRoute[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading saved routes from localStorage:', err);
    return [];
  }
}

export function saveRoute(
  taskId: TaskCategory,
  taskTitle: string,
  userAnswers: UserAnswers,
  guide: RouteGuide,
  existingId?: string,
  completedChecklistIds?: string[]
): SavedRoute {
  const currentRoutes = getSavedRoutes();
  const id = existingId || `route_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  
  const newRoute: SavedRoute = {
    id,
    taskId,
    taskTitle,
    createdAt: new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    userAnswers,
    completedChecklistIds: completedChecklistIds || [],
    guide
  };

  const filtered = currentRoutes.filter((r) => r.id !== id);
  const updated = [newRoute, ...filtered].slice(0, 20); // Keep last 20 routes
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving route to localStorage:', err);
  }
  return newRoute;
}

export function updateRouteChecklist(routeId: string, completedChecklistIds: string[]): SavedRoute[] {
  const routes = getSavedRoutes();
  const updated = routes.map((r) => {
    if (r.id === routeId) {
      return { ...r, completedChecklistIds };
    }
    return r;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating checklist in localStorage:', err);
  }
  return updated;
}

export function deleteSavedRoute(routeId: string): SavedRoute[] {
  const routes = getSavedRoutes();
  const filtered = routes.filter((r) => r.id !== routeId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Error deleting route from localStorage:', err);
  }
  return filtered;
}
