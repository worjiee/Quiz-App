import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { Clock, ChevronRight } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  onSubmitAnswer: (answer: number) => void;
}

export const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  onSubmitAnswer,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmitAnswer(selectedAnswer);
    }
  };

  const progress = ((questionNumber - 1) / totalQuestions) * 100;
  const timeProgress = (timeRemaining / 30) * 100;

  return (
    <div className="min-h-screen bg-quiz-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-slide-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {questionNumber} of {totalQuestions}</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className={timeRemaining <= 10 ? 'text-destructive font-bold' : ''}>
                {timeRemaining}s
              </span>
            </div>
          </div>
          
          {/* Progress bars */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <Progress 
              value={timeProgress} 
              className={`h-1 ${timeRemaining <= 10 ? 'bg-destructive/20' : ''}`}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-6 bg-card-gradient shadow-quiz">
          <h2 className="text-xl font-semibold text-card-foreground mb-6 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "answer"}
                onClick={() => handleAnswerSelect(index)}
                className="w-full"
              >
                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </Button>
            ))}
          </div>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          variant="quiz"
          size="lg"
          className="w-full rounded-xl"
        >
          {selectedAnswer !== null ? (
            <>
              Submit Answer
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            'Select an answer'
          )}
        </Button>
      </div>
    </div>
  );
};