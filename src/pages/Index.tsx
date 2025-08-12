import { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { QuizHome } from '@/components/QuizHome';
import { QuizQuestion } from '@/components/QuizQuestion';
import { QuizResult } from '@/components/QuizResult';

type GameState = 'home' | 'playing' | 'results';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const quiz = useQuiz();

  const handleStartQuiz = () => {
    quiz.startQuiz();
    setGameState('playing');
  };

  const handleQuizComplete = () => {
    setGameState('results');
  };

  const handleRestartQuiz = () => {
    quiz.restartQuiz();
    setGameState('playing');
  };

  const handleBackToHome = () => {
    setGameState('home');
  };

  // Check if quiz is complete
  if (gameState === 'playing' && quiz.quizState.isComplete) {
    const results = quiz.getResults();
    const isNewHighScore = quiz.saveHighScore(results.score);
    
    return (
      <QuizResult
        result={results}
        isNewHighScore={isNewHighScore}
        onRestartQuiz={handleRestartQuiz}
      />
    );
  }

  if (gameState === 'playing' && quiz.currentQuestion) {
    return (
      <QuizQuestion
        question={quiz.currentQuestion}
        questionNumber={quiz.quizState.currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        timeRemaining={quiz.quizState.timeRemaining}
        onSubmitAnswer={quiz.submitAnswer}
      />
    );
  }

  return (
    <QuizHome
      onStartQuiz={handleStartQuiz}
      highScore={quiz.getHighScore()}
    />
  );
};

export default Index;
