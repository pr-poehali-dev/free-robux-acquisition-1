import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  title: string;
  amount: number;
  time: string;
}

const Index = () => {
  const [balance, setBalance] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'Приветственный бонус', amount: 50, time: '2 минуты назад' },
    { id: 2, title: 'Ежедневная награда', amount: 25, time: '1 час назад' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('robuxBalance');
    if (savedBalance) {
      setBalance(parseInt(savedBalance));
    } else {
      setBalance(50);
      localStorage.setItem('robuxBalance', '50');
    }
  }, []);

  const addRobux = (amount: number, reason: string) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('robuxBalance', newBalance.toString());
    
    const newNotification: Notification = {
      id: Date.now(),
      title: reason,
      amount,
      time: 'Только что'
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    toast.success(`+${amount} Robux`, {
      description: reason,
    });
  };

  const steps = [
    {
      icon: 'UserPlus',
      title: 'Зарегистрируйтесь',
      description: 'Создайте бесплатный аккаунт и получите приветственный бонус 50 Robux'
    },
    {
      icon: 'ListChecks',
      title: 'Выполняйте задания',
      description: 'Проходите простые квесты, опросы и игровые челленджи'
    },
    {
      icon: 'Gift',
      title: 'Собирайте награды',
      description: 'Получайте ежедневные бонусы и участвуйте в розыгрышах'
    },
    {
      icon: 'Wallet',
      title: 'Выводите Robux',
      description: 'Переводите заработанные Robux на свой игровой аккаунт'
    }
  ];

  const features = [
    { icon: 'Shield', title: 'Безопасно', description: 'Официальные методы получения' },
    { icon: 'Zap', title: 'Быстро', description: 'Моментальное начисление' },
    { icon: 'Users', title: 'Проверено', description: 'Более 100,000 пользователей' },
    { icon: 'Award', title: 'Щедро', description: 'До 500 Robux ежедневно' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center animate-glow">
              <Icon name="Gem" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              RobuxFree
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Icon name="Bell" size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
              
              {showNotifications && (
                <Card className="absolute right-0 top-12 w-80 animate-fade-in shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Уведомления</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Icon name="Gift" size={20} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{notif.title}</p>
                          <p className="text-primary font-bold">+{notif.amount} Robux</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            
            <Card className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30">
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Баланс</p>
                  <p className="text-lg font-bold text-primary">{balance} R$</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 animate-fade-in" variant="secondary">
          <Icon name="TrendingUp" size={16} className="mr-1" />
          Более 100,000 довольных пользователей
        </Badge>
        
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Получай бесплатные<br />Robux каждый день
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
          Безопасная и проверенная платформа для заработка Robux. Выполняй задания, получай награды и обменивай на игровую валюту.
        </p>
        
        <div className="flex gap-4 justify-center mb-12 animate-slide-up">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
            onClick={() => addRobux(50, 'Приветственный бонус')}
          >
            <Icon name="Rocket" size={24} className="mr-2" />
            Начать зарабатывать
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6"
            onClick={() => {
              const element = document.getElementById('how-it-works');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Как это работает?
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in">
          {features.map((feature, idx) => (
            <Card key={idx} className="p-6 hover:scale-105 transition-transform cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20">
              <Icon name={feature.icon as any} size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Icon name="Map" size={16} className="mr-1" />
            Инструкция
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Как получить Robux?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой и понятный процесс в 4 шага
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step, idx) => (
            <Card 
              key={idx} 
              className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/80 backdrop-blur-sm group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon name={step.icon as any} size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">Шаг {idx + 1}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  {idx === 0 && (
                    <Button 
                      className="mt-4 w-full"
                      onClick={() => addRobux(50, 'Регистрация завершена')}
                    >
                      <Icon name="Sparkles" size={18} className="mr-2" />
                      Получить бонус
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/30 text-center">
          <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Доступные задания
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Выполняйте различные задания и увеличивайте свой баланс
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Card className="p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => addRobux(25, 'Ежедневный вход')}>
              <Icon name="Calendar" size={32} className="mx-auto mb-3 text-primary" />
              <h3 className="font-bold mb-2">Ежедневный вход</h3>
              <p className="text-sm text-muted-foreground mb-3">Заходи каждый день</p>
              <Badge className="bg-primary">+25 Robux</Badge>
            </Card>
            
            <Card className="p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => addRobux(100, 'Опрос завершён')}>
              <Icon name="ClipboardList" size={32} className="mx-auto mb-3 text-secondary" />
              <h3 className="font-bold mb-2">Пройди опрос</h3>
              <p className="text-sm text-muted-foreground mb-3">5-10 минут</p>
              <Badge className="bg-secondary">+100 Robux</Badge>
            </Card>
            
            <Card className="p-6 hover:scale-105 transition-transform cursor-pointer" onClick={() => addRobux(50, 'Просмотр видео')}>
              <Icon name="Play" size={32} className="mx-auto mb-3 text-accent" />
              <h3 className="font-bold mb-2">Смотри видео</h3>
              <p className="text-sm text-muted-foreground mb-3">30-60 секунд</p>
              <Badge className="bg-accent">+50 Robux</Badge>
            </Card>
          </div>
        </Card>
      </section>

      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Gem" size={24} className="text-primary" />
              <span className="font-bold">RobuxFree</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RobuxFree. Безопасная платформа для получения Robux.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
