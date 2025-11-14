import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Question {
  id: number;
  word: string;
  correctSounds: number;
  correctLetters: number;
}

const SoundsTask = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [soundsInput, setSoundsInput] = useState('');
  const [lettersInput, setLettersInput] = useState('');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [completed, setCompleted] = useState(false);
  const [foxMessage, setFoxMessage] = useState('Давай считать звуки и буквы! 🦊');

  const questions: Question[] = [
    {
      id: 1,
      word: 'Дуб',
      correctSounds: 3,
      correctLetters: 3,
    },
    {
      id: 2,
      word: 'Ель',
      correctSounds: 3,
      correctLetters: 3,
    },
    {
      id: 3,
      word: 'Стол',
      correctSounds: 4,
      correctLetters: 4,
    },
  ];

  const foxMessages = {
    correct: ['Правильно! 🦊✨', 'Ты отлично считаешь! 🦊💫', 'Умница! 🦊🌟'],
    wrong: ['Подумай ещё! 🦊', 'Попробуй посчитать заново! 🦊', 'Считай внимательно! 🦊'],
    final: ['Ура! Ты научился считать звуки! 🦊🎉', 'Молодец! Теперь ты эксперт! 🦊⭐'],
  };

  const handleCheck = () => {
    if (showFeedback) return;

    const question = questions[currentQuestion];
    const soundsCorrect = parseInt(soundsInput) === question.correctSounds;
    const lettersCorrect = parseInt(lettersInput) === question.correctLetters;

    if (soundsCorrect && lettersCorrect) {
      setShowFeedback('correct');
      setScore(score + 1);
      const randomMessage = foxMessages.correct[Math.floor(Math.random() * foxMessages.correct.length)];
      setFoxMessage(randomMessage);
      
      setTimeout(() => {
        setShowFeedback(null);
        setSoundsInput('');
        setLettersInput('');
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setFoxMessage('Следующее слово! Ты справишься! 🦊');
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
        setFoxMessage('Считай буквы и звуки медленно! 🦊');
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
                Слово {currentQuestion + 1} из {questions.length}
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
              🔊 Определи количество звуков и букв
            </h1>
            
            <div className="mb-8">
              <div className="inline-block px-8 py-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl border-4 border-primary">
                <p className="text-6xl md:text-7xl font-bold text-primary animate-pulse-slow">
                  {question.word}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-accent/30 p-6 rounded-xl border-2 border-primary/20">
              <label className="block text-xl font-semibold mb-3 text-foreground">
                🔊 Количество звуков:
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={soundsInput}
                  onChange={(e) => setSoundsInput(e.target.value)}
                  className="text-3xl font-bold text-center h-16 border-4"
                  placeholder="?"
                  disabled={showFeedback !== null}
                />
                <span className="text-2xl font-semibold">зв.</span>
              </div>
            </div>

            <div className="bg-accent/30 p-6 rounded-xl border-2 border-primary/20">
              <label className="block text-xl font-semibold mb-3 text-foreground">
                🔤 Количество букв:
              </label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min="0"
                  max="20"
                  value={lettersInput}
                  onChange={(e) => setLettersInput(e.target.value)}
                  className="text-3xl font-bold text-center h-16 border-4"
                  placeholder="?"
                  disabled={showFeedback !== null}
                />
                <span className="text-2xl font-semibold">б.</span>
              </div>
            </div>

            <Button
              onClick={handleCheck}
              disabled={!soundsInput || !lettersInput || showFeedback !== null}
              size="lg"
              className="w-full text-xl h-16"
            >
              {showFeedback ? 'Проверяем...' : 'Проверить ответ'}
            </Button>
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

export default SoundsTask;
