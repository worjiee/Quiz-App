import { useState, useEffect, useCallback } from 'react';
import { QuizQuestion, QuizState, QuizResult } from '@/types/quiz';
import { getRandomizedQuestions } from '@/data/quizQuestions';

const QUESTION_TIME_LIMIT = 30; // seconds per question

export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timeRemaining: QUESTION_TIME_LIMIT,
    isComplete: false,
  });
  const [startTime, setStartTime] = useState<number>(0);

  // Initialize quiz
  const startQuiz = useCallback(() => {
    const randomizedQuestions = getRandomizedQuestions();
    setQuestions(randomizedQuestions);
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: QUESTION_TIME_LIMIT,
      isComplete: false,
    });
    setStartTime(Date.now());
  }, []);

  // Timer logic
  useEffect(() => {
    if (!quizState.isComplete && questions.length > 0) {
      const timer = setInterval(() => {
        setQuizState(prev => {
          if (prev.timeRemaining <= 1) {
            // Time's up, move to next question
            return nextQuestion(prev, -1); // -1 indicates no answer selected
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.currentQuestionIndex, quizState.isComplete, questions.length]);

  const nextQuestion = (state: QuizState, selectedAnswer: number): QuizState => {
    const newAnswers = [...state.answers, selectedAnswer];
    const isCorrect = selectedAnswer === questions[state.currentQuestionIndex]?.correctAnswer;
    const newScore = isCorrect ? state.score + 1 : state.score;
    const nextIndex = state.currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      return {
        ...state,
        answers: newAnswers,
        score: newScore,
        isComplete: true,
        timeRemaining: 0,
      };
    }

    return {
      ...state,
      currentQuestionIndex: nextIndex,
      answers: newAnswers,
      score: newScore,
      timeRemaining: QUESTION_TIME_LIMIT,
    };
  };

  const submitAnswer = useCallback((selectedAnswer: number) => {
    setQuizState(prev => nextQuestion(prev, selectedAnswer));
  }, [questions]);

  const restartQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const getResults = (): QuizResult => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    return {
      score: quizState.score,
      totalQuestions: questions.length,
      percentage: questions.length > 0 ? Math.round((quizState.score / questions.length) * 100) : 0,
      timeSpent,
    };
  };

  // High score management with localStorage
  const getHighScore = (): number => {
    return parseInt(localStorage.getItem('quiz-high-score') || '0');
  };

  const saveHighScore = (score: number) => {
    const currentHigh = getHighScore();
    if (score > currentHigh) {
      localStorage.setItem('quiz-high-score', score.toString());
      return true; // New high score
    }
    return false;
  };

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return {
    questions,
    quizState,
    currentQuestion,
    startQuiz,
    submitAnswer,
    restartQuiz,
    getResults,
    getHighScore,
    saveHighScore,
  };
};