import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { supabase } from './supabase';
import { MessageCircle, Users, Settings as SettingsIcon } from 'lucide-react';

import Auth from './screens/Auth.jsx';
import Chats from './screens/Chats.jsx';
import Contacts from './screens/Contacts.jsx';
import Settings from './screens/Settings.jsx';
import ChatDetail from './screens/ChatDetail.jsx';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  if (!session) return <Auth />;

  return (
    <Router>
      <div className="flex flex-col h-[100dvh] bg-white max-w-md mx-auto relative overflow-hidden shadow-2xl">
        
        {/* Контентная часть */}
        <div className="flex-1 overflow-y-auto bg-white pb-[80px]">
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<ChatDetail />} />
          </Routes>
        </div>

        {/* Навигация как в оригинальном ТГ */}
        <nav className="absolute bottom-0 w-full bg-gray-50/80 backdrop-blur-xl border-t border-gray-200 flex justify-around items-center py-2 pb-6 px-4 z-50">
          <NavLink to="/contacts" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-gray-400'}`}>
            <Users size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Контакты</span>
          </NavLink>
          
          <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-gray-400'}`}>
            <MessageCircle size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Чаты</span>
          </NavLink>
          
          <NavLink to="/settings" className={({isActive}) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#0088cc]' : 'text-gray-400'}`}>
            <SettingsIcon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Настройки</span>
          </NavLink>
        </nav>
      </div>
    </Router>
  );
}
