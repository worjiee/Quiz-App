import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Trophy, Clock, Target } from 'lucide-react';

interface QuizHomeProps {
  onStartQuiz: () => void;
  highScore: number;
}

export const QuizHome = ({ onStartQuiz, highScore }: QuizHomeProps) => {
  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-slide-up">
        {/* Logo/Title */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-primary-gradient rounded-full flex items-center justify-center shadow-glow">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Ace</h1>
            <p className="text-lg text-muted-foreground">Test your Java knowledge!</p>
          </div>
        </div>

        {/* Stats Card */}
        <Card className="p-6 bg-card-gradient shadow-quiz">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Trophy className="w-6 h-6 mx-auto text-accent" />
              <div className="text-2xl font-bold text-accent">{highScore}</div>
              <div className="text-xs text-muted-foreground">High Score</div>
            </div>
            <div className="space-y-2">
              <Target className="w-6 h-6 mx-auto text-primary" />
              <div className="text-2xl font-bold text-primary">10</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="space-y-2">
              <Clock className="w-6 h-6 mx-auto text-secondary" />
              <div className="text-2xl font-bold text-secondary">30s</div>
              <div className="text-xs text-muted-foreground">Per Question</div>
            </div>
          </div>
        </Card>

        {/* Start Button */}
        <Button 
          onClick={onStartQuiz}
          variant="quiz"
          size="lg"
          className="w-full text-xl py-6 rounded-xl"
        >
          Start Quiz
        </Button>

        {/* Features */}
        <div className="space-y-3 text-center text-sm text-muted-foreground">
          <p>• Randomized questions and answers</p>
          <p>• 30 seconds per question</p>
          <p>• Instant feedback and explanations</p>
        </div>
      </div>
    </div>
  );
};