import { Link } from 'react-router-dom';
import { Search, Edit } from 'lucide-react';

const CHATS = [
  { id: '1', name: 'Flygramm Support', msg: 'Добро пожаловать в Flygramm!', time: '19:42', unread: 1 },
  { id: '2', name: 'Избранное', msg: 'Промты для нейросетей...', time: 'Вчера', unread: 0 },
  { id: '3', name: 'Алексей', msg: 'Голосовое сообщение', time: 'Пн', unread: 0 },
];

export default function Chats() {
  return (
    <div className="bg-white min-h-screen">
      {/* Шапка */}
      <header className="px-4 pt-12 pb-2 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button className="text-[#0088cc] text-sm">Изм.</button>
        <h1 className="font-bold text-lg">Чаты</h1>
        <button className="text-[#0088cc]"><Edit size={20} /></button>
      </header>

      {/* Поиск */}
      <div className="px-4 py-2">
        <div className="bg-gray-100 flex items-center gap-2 px-3 py-1.5 rounded-xl text-gray-400">
          <Search size={16} />
          <span className="text-sm">Поиск по чатам</span>
        </div>
      </div>

      {/* Список чатов */}
      <div className="mt-2">
        {CHATS.map(chat => (
          <Link to={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-3 px-4 py-3 ios-tap border-b border-gray-100 last:border-0">
            {/* Аватарка */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold bg-gradient-to-b ${chat.id === '1' ? 'from-blue-400 to-blue-600' : 'from-yellow-400 to-orange-500'}`}>
              {chat.name[0]}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[16px] text-black">{chat.name}</span>
                <span className="text-[13px] text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center mt-0.5">
                <p className="text-[14px] text-gray-500 truncate pr-4">{chat.msg}</p>
                {chat.unread > 0 && (
                  <span className="bg-[#0088cc] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
