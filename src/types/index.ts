export type TaskCategory = 'presentation' | 'writing' | 'research' | 'images' | 'study';

export interface QuestionOption {
  id: string;
  label: string;
  detail?: string;
}

export interface Question {
  id: string;
  label: string;
  description?: string;
  options: QuestionOption[];
}

export interface TaskDefinition {
  id: TaskCategory;
  title: string;
  shortDescription: string;
  categoryTag: string;
  estimatedMinutes: number;
  highlighted?: boolean;
  questions: Question[];
}

export type UserAnswers = Record<string, string>;

export interface RecommendedTool {
  name: string;
  isFree: boolean;
  tierInfo: string;
  why: string;
  webHint: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  detail: string;
}

export interface RouteGuide {
  taskId: TaskCategory;
  taskTitle: string;
  objective: string;
  whyThisRoute: string;
  recommendedTool: RecommendedTool;
  step1: {
    title: string;
    summary: string;
    items: string[];
    proTip?: string;
  };
  step2: {
    title: string;
    summary: string;
    copyablePrompt: string;
    promptExplanation: string;
    variablesToFill: { key: string; label: string; example: string }[];
  };
  step3: {
    title: string;
    summary: string;
    checks: string[];
    whatToAvoid: string;
  };
  checklist: ChecklistItem[];
  nextAction: string;
}

export interface SavedRoute {
  id: string;
  taskId: TaskCategory;
  taskTitle: string;
  createdAt: string;
  userAnswers: UserAnswers;
  completedChecklistIds: string[];
  guide: RouteGuide;
}
