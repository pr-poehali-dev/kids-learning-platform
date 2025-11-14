import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Letter {
  letter: string;
  isTarget: boolean;
}

interface Question {
  id: number;
  letters: Letter[];
  target: string;
}

const Task = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [completed, setCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      letters: [
        { letter: 'Б', isTarget: false },
        { letter: 'Ы', isTarget: false },
        { letter: 'К', isTarget: false },
        { letter: 'А', isTarget: true },
      ],
      target: 'А',
    },
    {
      id: 2,
      letters: [
        { letter: 'Е', isTarget: false },
        { letter: 'П', isTarget: true },
        { letter: 'Ф', isTarget: false },
        { letter: 'Ш', isTarget: false },
      ],
      target: 'П',
    },
    {
      id: 3,
      letters: [
        { letter: 'Х', isTarget: false },
        { letter: 'В', isTarget: true },
        { letter: 'Ч', isTarget: false },
      ],
      target: 'В',
    },
  ];

  const handleLetterClick = (isTarget: boolean) => {
    if (showFeedback) return;

    if (isTarget) {
      setShowFeedback('correct');
      setScore(score + 1);
      setTimeout(() => {
        setShowFeedback(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setCompleted(true);
        }
      }, 1500);
    } else {
      setShowFeedback('wrong');
      setTimeout(() => {
        setShowFeedback(null);
      }, 1000);
    }
  };

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    const stars = score === questions.length ? 3 : score >= questions.length - 1 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center bg-white/90 backdrop-blur shadow-2xl border-2 border-primary/20 animate-slide-up">
          <div className="text-8xl mb-6 animate-bounce-in">🎉</div>
          <h2 className="text-3xl font-bold text-primary mb-4">Отлично!</h2>
          <p className="text-xl mb-6">
            Ты нашёл {score} из {questions.length} букв!
          </p>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((star) => (
              <span key={star} className="text-5xl animate-bounce-in">
                {star <= stars ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <Button
            onClick={() => navigate('/')}
            size="lg"
            className="w-full text-lg h-14"
          >
            <Icon name="Home" className="mr-2" size={24} />
            На главную
          </Button>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
            className="shrink-0"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-muted-foreground">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className="text-sm font-bold text-primary">
                Счёт: {score}⭐
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </div>
        </div>

        <Card className="p-8 bg-white/90 backdrop-blur shadow-2xl border-2 border-primary/20 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              🔤 Найди букву
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              Найди букву{' '}
              <span className="text-4xl md:text-5xl text-secondary px-4 py-2 bg-secondary/10 rounded-lg inline-block">
                {question.target}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {question.letters.map((item, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(item.isTarget)}
                disabled={showFeedback !== null}
                className={`
                  w-24 h-24 md:w-32 md:h-32 
                  text-5xl md:text-6xl font-bold
                  rounded-2xl border-4
                  transition-all duration-200
                  ${
                    showFeedback === null
                      ? 'bg-white border-primary/30 hover:border-primary hover:scale-110 hover:shadow-xl cursor-pointer active:scale-95'
                      : showFeedback === 'correct' && item.isTarget
                      ? 'bg-green-100 border-green-500 scale-110 shadow-xl'
                      : showFeedback === 'wrong' && !item.isTarget
                      ? 'bg-red-100 border-red-500 animate-shake'
                      : 'bg-white border-primary/30'
                  }
                `}
              >
                {item.letter}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-8 text-center animate-bounce-in">
              {showFeedback === 'correct' ? (
                <div className="text-6xl">✅</div>
              ) : (
                <div className="text-6xl">❌</div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Task;
