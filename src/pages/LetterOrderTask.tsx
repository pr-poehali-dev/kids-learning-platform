import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  sequence: string[];
  options: string[];
  correctAnswer: string;
}

const LetterOrderTask = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [foxMessage, setFoxMessage] = useState('Привет! Я помогу тебе выучить алфавит! 🦊');

  const questions: Question[] = [
    {
      id: 1,
      sequence: ['Ц', 'Ч', '...', 'Щ'],
      options: ['Ш', 'Ы', 'Э'],
      correctAnswer: 'Ш',
    },
    {
      id: 2,
      sequence: ['С', 'Т', '...', 'Ф'],
      options: ['У', 'Х', 'Ц'],
      correctAnswer: 'У',
    },
    {
      id: 3,
      sequence: ['Д', 'Е', '...', 'Ж'],
      options: ['Ё', 'З', 'И'],
      correctAnswer: 'Ё',
    },
    {
      id: 4,
      sequence: ['М', 'Н', '...', 'П'],
      options: ['О', 'Р', 'С'],
      correctAnswer: 'О',
    },
  ];

  const foxMessages = {
    correct: ['Молодец! 🦊✨', 'Отлично! 🦊💫', 'Супер! 🦊🌟', 'Умничка! 🦊⭐'],
    wrong: ['Попробуй ещё раз! 🦊', 'Почти! Давай снова! 🦊', 'Не сдавайся! 🦊'],
    final: ['Ты справился! Я горжусь тобой! 🦊🎉', 'Потрясающе! Ты знаешь алфавит! 🦊⭐'],
  };

  const handleOptionClick = (selectedAnswer: string) => {
    if (showFeedback) return;

    const question = questions[currentQuestion];
    if (selectedAnswer === question.correctAnswer) {
      setShowFeedback('correct');
      setScore(score + 1);
      const randomMessage = foxMessages.correct[Math.floor(Math.random() * foxMessages.correct.length)];
      setFoxMessage(randomMessage);
      
      setTimeout(() => {
        setShowFeedback(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setFoxMessage('Следующая буква! Ты справишься! 🦊');
        } else {
          setCompleted(true);
          const finalMessage = foxMessages.final[Math.floor(Math.random() * foxMessages.final.length)];
          setFoxMessage(finalMessage);
        }
      }, 1500);
    } else {
      setShowFeedback('wrong');
      const randomMessage = foxMessages.wrong[Math.floor(Math.random() * foxMessages.wrong.length)];
      setFoxMessage(randomMessage);
      setTimeout(() => {
        setShowFeedback(null);
        setFoxMessage('Подумай, какая буква стоит между ними? 🦊');
      }, 1000);
    }
  };

  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  if (completed) {
    const stars = score === questions.length ? 3 : score >= questions.length - 1 ? 2 : 1;
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center bg-white/90 backdrop-blur shadow-2xl border-2 border-primary/20 animate-slide-up">
          <div className="text-8xl mb-4 animate-bounce-in">🦊</div>
          <div className="text-6xl mb-6 animate-bounce-in">🎉</div>
          <h2 className="text-3xl font-bold text-primary mb-4">{foxMessage}</h2>
          <p className="text-xl mb-6">
            Правильных ответов: {score} из {questions.length}
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

        <div className="mb-6">
          <Card className="p-6 bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-pulse-slow">🦊</div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-foreground">{foxMessage}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-white/90 backdrop-blur shadow-2xl border-2 border-primary/20 animate-slide-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              📝 Установи верный порядок букв
            </h1>
            
            <div className="flex justify-center items-center gap-3 md:gap-4 mb-8">
              {question.sequence.map((letter, index) => (
                <div
                  key={index}
                  className={`
                    w-16 h-16 md:w-20 md:h-20
                    flex items-center justify-center
                    text-3xl md:text-4xl font-bold
                    rounded-xl border-4
                    ${
                      letter === '...'
                        ? 'bg-secondary/10 border-secondary border-dashed text-secondary'
                        : 'bg-primary/10 border-primary text-primary'
                    }
                  `}
                >
                  {letter}
                </div>
              ))}
            </div>

            <p className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6">
              Какая буква пропущена?
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={showFeedback !== null}
                className={`
                  w-24 h-24 md:w-32 md:h-32 
                  text-5xl md:text-6xl font-bold
                  rounded-2xl border-4
                  transition-all duration-200
                  ${
                    showFeedback === null
                      ? 'bg-white border-primary/30 hover:border-primary hover:scale-110 hover:shadow-xl cursor-pointer active:scale-95'
                      : showFeedback === 'correct' && option === question.correctAnswer
                      ? 'bg-green-100 border-green-500 scale-110 shadow-xl'
                      : showFeedback === 'wrong' && option !== question.correctAnswer
                      ? 'bg-red-100 border-red-500 animate-shake'
                      : 'bg-white border-primary/30'
                  }
                `}
              >
                {option}
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

export default LetterOrderTask;
