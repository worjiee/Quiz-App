import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizResult as QuizResultType } from '@/types/quiz';
import { Trophy, RotateCcw, Clock, Target, Award, TrendingUp } from 'lucide-react';

interface QuizResultProps {
  result: QuizResultType;
  isNewHighScore: boolean;
  onRestartQuiz: () => void;
}

export const QuizResult = ({ result, isNewHighScore, onRestartQuiz }: QuizResultProps) => {
  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { message: "Outstanding! 🌟", color: "text-accent" };
    if (percentage >= 80) return { message: "Excellent work! 🎉", color: "text-success" };
    if (percentage >= 70) return { message: "Great job! 👏", color: "text-primary" };
    if (percentage >= 60) return { message: "Good effort! 👍", color: "text-secondary" };
    return { message: "Keep practicing! 💪", color: "text-muted-foreground" };
  };

  const performance = getPerformanceMessage(result.percentage);
  const minutes = Math.floor(result.timeSpent / 60);
  const seconds = result.timeSpent % 60;

  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-glow ${
            isNewHighScore ? 'bg-accent animate-pulse-glow' : 'bg-primary-gradient'
          }`}>
            {isNewHighScore ? (
              <Award className="w-10 h-10 text-white" />
            ) : (
              <Trophy className="w-10 h-10 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isNewHighScore ? 'New High Score!' : 'Quiz Complete!'}
            </h1>
            <p className={`text-lg font-semibold ${performance.color}`}>
              {performance.message}
            </p>
          </div>
        </div>

        {/* Score Card */}
        <Card className="p-6 bg-card-gradient shadow-quiz text-center">
          <div className="space-y-4">
            <div className="text-6xl font-bold text-primary">
              {result.percentage}%
            </div>
            <div className="text-lg text-muted-foreground">
              {result.score} out of {result.totalQuestions} correct
            </div>
            {isNewHighScore && (
              <div className="bg-accent/10 text-accent px-4 py-2 rounded-lg animate-bounce-in">
                🎉 Personal Best!
              </div>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card-gradient shadow-quiz text-center">
            <Clock className="w-6 h-6 mx-auto text-secondary mb-2" />
            <div className="text-lg font-bold text-secondary">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </Card>
          
          <Card className="p-4 bg-card-gradient shadow-quiz text-center">
            <Target className="w-6 h-6 mx-auto text-primary mb-2" />
            <div className="text-lg font-bold text-primary">
              {((result.score / result.totalQuestions) * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onRestartQuiz}
            variant="quiz"
            size="lg"
            className="w-full rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          
          <Button
            variant="result"
            size="lg"
            className="w-full rounded-xl"
            onClick={() => {
              // Share functionality could be added here
              if (navigator.share) {
                navigator.share({
                  title: 'Quiz Ace - Java Quiz',
                  text: `I scored ${result.percentage}% on the Java Quiz! Can you beat my score?`,
                  url: window.location.href,
                });
              }
            }}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Share Result
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          {result.percentage < 80 && (
            <p>💡 Review the explanations and try again!</p>
          )}
          {result.percentage >= 80 && (
            <p>🚀 You're mastering Java concepts!</p>
          )}
        </div>
      </div>
    </div>
  );
};