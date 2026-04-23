import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

// Импорт иконок (убедись, что библиотека lucide-react в package.json)
import { MessageCircle, Users, Settings as SettingsIcon } from 'lucide-react';

// Импорт экранов (Убедись, что файлы в папке screens называются именно так)
import Auth from './screens/Auth.jsx';
import Chats from './screens/Chats.jsx';
import Contacts from './screens/Contacts.jsx';
import Settings from './screens/Settings.jsx';
import ChatDetail from './screens/ChatDetail.jsx';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверка текущей сессии при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Слушатель изменений состояния авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center font-bold text-tgBlue text-xl animate-pulse">Flygramm...</div>;
  }

  // Если пользователь не вошел — показываем только экран Auth
  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      <div className="flex flex-col h-screen bg-white max-w-md mx-auto border-x shadow-2xl relative overflow-hidden">
        
        {/* Основная область контента */}
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<ChatDetail />} />
            {/* Редирект на главную, если путь не найден */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Нижняя навигация (Bottom Tabs) */}
        <nav className="fixed bottom-0 w-full max-w-md bg-gray-50 border-t border-gray-200 flex justify-around py-3 z-40 backdrop-blur-md bg-white/80">
          <Link to="/contacts" className="flex flex-col items-center text-gray-400 focus:text-blue-500 hover:text-blue-500">
            <Users size={24} />
            <span className="text-[10px] mt-1 font-medium">Контакты</span>
          </Link>
          
          <Link to="/" className="flex flex-col items-center text-gray-400 focus:text-blue-500 hover:text-blue-500">
            <MessageCircle size={24} />
            <span className="text-[10px] mt-1 font-medium">Чаты</span>
          </Link>
          
          <Link to="/settings" className="flex flex-col items-center text-gray-400 focus:text-blue-500 hover:text-blue-500">
            <SettingsIcon size={24} />
            <span className="text-[10px] mt-1 font-medium">Настройки</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}
