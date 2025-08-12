export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  timeRemaining: number;
  isComplete: boolean;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
}