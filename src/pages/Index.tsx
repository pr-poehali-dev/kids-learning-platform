import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type TabType = 'home' | 'progress' | 'achievements' | 'profile';

interface Task {
  id: number;
  title: string;
  emoji: string;
  completed: boolean;
  stars: number;
}

interface Achievement {
  id: number;
  title: string;
  emoji: string;
  unlocked: boolean;
  description: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Найди букву', emoji: '🔍', completed: false, stars: 0 },
    { id: 2, title: 'Порядок букв', emoji: '🔤', completed: false, stars: 0 },
    { id: 3, title: 'Звуки и буквы', emoji: '🔊', completed: false, stars: 0 },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: 'Первый шаг', emoji: '👟', unlocked: true, description: 'Выполнил первое задание' },
    { id: 2, title: 'Звёздный ученик', emoji: '⭐', unlocked: true, description: 'Собрал 10 звёзд' },
    { id: 3, title: 'Знаток русского', emoji: '📖', unlocked: false, description: 'Выполнил все задания по русскому языку' },
    { id: 4, title: 'Неделька', emoji: '📅', unlocked: false, description: 'Занимался 7 дней подряд' },
    { id: 5, title: 'Молния', emoji: '⚡', unlocked: false, description: 'Выполнил 5 заданий за день' },
    { id: 6, title: 'Чемпион', emoji: '🏆', unlocked: false, description: 'Получил 50 звёзд' },
  ]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalStars = tasks.reduce((sum, t) => sum + t.stars, 0);
  const progressPercent = (completedTasks / tasks.length) * 100;

  const handleTaskClick = (taskId: number) => {
    if (taskId === 1) {
      navigate('/task/find-letter');
    } else if (taskId === 2) {
      navigate('/task/letter-order');
    } else if (taskId === 3) {
      navigate('/task/sounds');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted pb-20">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <header className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            🚀 Учим.ру
          </h1>
          <p className="text-lg text-muted-foreground">
            Учись играя!
          </p>
        </header>

        {activeTab === 'home' && (
          <div className="space-y-6 animate-slide-up">
            <Card className="p-6 bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-300 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="text-7xl animate-pulse-slow">🦊</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-2">Привет! Я Лиса!</h3>
                  <p className="text-lg text-foreground">
                    Я помогу тебе выучить русский язык! Давай начнём с заданий! 🌟
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">Твои задания</h2>
                <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                  {completedTasks}/{tasks.length}
                </Badge>
              </div>
              <Progress value={progressPercent} className="h-3 mb-6" />
              
              <div className="grid grid-cols-1 gap-4">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    onClick={() => handleTaskClick(task.id)}
                    className={`p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl border-2 ${
                      task.completed 
                        ? 'bg-gradient-to-br from-secondary/20 to-primary/20 border-primary' 
                        : 'bg-white border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-5xl animate-bounce-in">
                        {task.emoji}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((star) => (
                            <span 
                              key={star}
                              className={`text-xl ${star <= task.stars ? 'animate-bounce-in' : ''}`}
                            >
                              {star <= task.stars ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                      {task.completed && (
                        <div className="text-3xl animate-bounce-in">✅</div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6 animate-slide-up">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg border-2 border-secondary/20">
              <h2 className="text-2xl font-bold text-secondary mb-6">📊 Твой прогресс</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <div className="text-5xl mb-2 animate-pulse-slow">⭐</div>
                  <div className="text-3xl font-bold text-primary mb-1">{totalStars}</div>
                  <div className="text-sm text-muted-foreground">Звёзд собрано</div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <div className="text-5xl mb-2 animate-pulse-slow">✅</div>
                  <div className="text-3xl font-bold text-secondary mb-1">{completedTasks}</div>
                  <div className="text-sm text-muted-foreground">Заданий выполнено</div>
                </Card>
                
                <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-accent/40">
                  <div className="text-5xl mb-2 animate-pulse-slow">🔥</div>
                  <div className="text-3xl font-bold text-orange-600 mb-1">5</div>
                  <div className="text-sm text-muted-foreground">Дней подряд</div>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Прогресс по предметам</h3>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">✍️ Орфография</span>
                    <span className="text-primary font-bold">67%</span>
                  </div>
                  <Progress value={67} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">📝 Грамматика</span>
                    <span className="text-secondary font-bold">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">📖 Чтение</span>
                    <span className="text-orange-600 font-bold">83%</span>
                  </div>
                  <Progress value={83} className="h-3" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4 animate-slide-up">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg border-2 border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-6">🏆 Достижения</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`p-6 text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary hover:scale-105 hover:shadow-xl cursor-pointer'
                        : 'bg-muted/30 opacity-50 grayscale'
                    }`}
                  >
                    <div className={`text-6xl mb-3 ${achievement.unlocked ? 'animate-bounce-in' : ''}`}>
                      {achievement.emoji}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-slide-up">
            <Card className="p-6 bg-white/80 backdrop-blur shadow-lg border-2 border-secondary/20">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary animate-bounce-in">
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-primary to-secondary text-white">
                    👦
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-3xl font-bold mb-2">Саша Петров</h2>
                <Badge className="text-base px-4 py-2 bg-primary text-primary-foreground">
                  3 класс 📚
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold text-primary">{totalStars}</div>
                  <div className="text-sm text-muted-foreground">Всего звёзд</div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 text-center">
                  <div className="text-3xl mb-2">🏅</div>
                  <div className="text-2xl font-bold text-secondary">
                    {achievements.filter(a => a.unlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Достижений</div>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">⚙️ Настройки</h3>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-lg h-14 border-2 hover:border-primary hover:bg-primary/5"
                >
                  <Icon name="User" className="mr-3" size={24} />
                  Изменить профиль
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-lg h-14 border-2 hover:border-secondary hover:bg-secondary/5"
                >
                  <Icon name="Bell" className="mr-3" size={24} />
                  Уведомления
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start text-lg h-14 border-2 hover:border-orange-500 hover:bg-orange-50"
                >
                  <Icon name="HelpCircle" className="mr-3" size={24} />
                  Помощь
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t-2 border-primary/20 shadow-lg">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 py-3">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 h-auto py-3 ${
                activeTab === 'home' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <Icon name="Home" size={24} />
              <span className="text-xs font-semibold">Главная</span>
            </Button>

            <Button
              variant={activeTab === 'progress' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('progress')}
              className={`flex flex-col items-center gap-1 h-auto py-3 ${
                activeTab === 'progress' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <Icon name="TrendingUp" size={24} />
              <span className="text-xs font-semibold">Прогресс</span>
            </Button>

            <Button
              variant={activeTab === 'achievements' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('achievements')}
              className={`flex flex-col items-center gap-1 h-auto py-3 ${
                activeTab === 'achievements' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <Icon name="Trophy" size={24} />
              <span className="text-xs font-semibold">Награды</span>
            </Button>

            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 h-auto py-3 ${
                activeTab === 'profile' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              <Icon name="User" size={24} />
              <span className="text-xs font-semibold">Профиль</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;