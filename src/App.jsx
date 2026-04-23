import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

// Иконки (убедись, что lucide-react есть в package.json)
import { MessageCircle, Users, Settings as SettingsIcon } from 'lucide-react';

// Экраны
import Auth from './screens/Auth.jsx';
import Chats from './screens/Chats.jsx';
import Contacts from './screens/Contacts.jsx';
import Settings from './screens/Settings.jsx';
import ChatDetail from './screens/ChatDetail.jsx';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Слушаем вход/выход
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Экран загрузки в стиле ТГ
  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-white">
        <div className="w-16 h-16 bg-[#0088cc] rounded-[20px] flex items-center justify-center text-white text-3xl font-bold animate-pulse">
          F
        </div>
      </div>
    );
  }

  // Если не залогинен — только экран входа
  if (!session) {
    return <Auth />;
  }

  return (
    <Router>
      {/* h-[100dvh] фиксирует высоту на iPhone, чтобы кнопки не уплывали */}
      <div className="flex flex-col h-[100dvh] bg-[#f1f1f2] max-w-md mx-auto relative overflow-hidden shadow-2xl">
        
        {/* Контентная часть */}
        <div className="flex-1 overflow-y-auto bg-white">
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<ChatDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        {/* Навигационная панель (Tab Bar как в iOS) */}
        <nav className="w-full bg-[#f9f9f9]/90 backdrop-blur-xl border-t border-gray-300 flex justify-around items-center pt-2 pb-8 px-4 z-50">
          <NavLink 
            to="/contacts" 
            className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-[#8e8e93]'}`}
          >
            <Users size={26} strokeWidth={2} />
            <span className="text-[10px] font-medium">Контакты</span>
          </NavLink>
          
          <NavLink 
            to="/" 
            className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-[#8e8e93]'}`}
          >
            <MessageCircle size={26} strokeWidth={2} />
            <span className="text-[10px] font-medium">Чаты</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-[#8e8e93]'}`}
          >
            <SettingsIcon size={26} strokeWidth={2} />
            <span className="text-[10px] font-medium">Настройки</span>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}
