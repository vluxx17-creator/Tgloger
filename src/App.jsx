import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageCircle, Users, Settings as SettingsIcon, Search, PlusCircle } from 'lucide-react';
import Chats from './screens/Chats';
import Contacts from './screens/Contacts';
import Settings from './screens/Settings';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-white max-w-md mx-auto border-x shadow-2xl overflow-hidden">
        {/* Верхняя панель (Header) */}
        <header className="p-4 flex justify-between items-center bg-white border-b">
          <h1 className="text-xl font-bold text-tgBlue">Flygramm</h1>
          <div className="flex gap-3">
            <Search className="w-6 h-6 text-gray-400" />
            <PlusCircle className="w-6 h-6 text-tgBlue" />
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1 overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<Chats />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Нижние вкладки (Bottom Tabs) */}
        <nav className="fixed bottom-0 w-full max-w-md bg-gray-50 border-t flex justify-around py-3">
          <Link to="/contacts" className="flex flex-col items-center text-gray-400 hover:text-tgBlue">
            <Users size={24} />
            <span className="text-[10px]">Контакты</span>
          </Link>
          <Link to="/" className="flex flex-col items-center text-gray-400 hover:text-tgBlue">
            <MessageCircle size={24} />
            <span className="text-[10px]">Чаты</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center text-gray-400 hover:text-tgBlue">
            <SettingsIcon size={24} />
            <span className="text-[10px]">Настройки</span>
          </Link>
        </nav>
      </div>
    </Router>
  );
}
