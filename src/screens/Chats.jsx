import { Link } from 'react-router-dom';
import { Search, Edit } from 'lucide-react';

export default function Chats() {
  const chats = [
    { id: '1', name: 'Flygramm Support', msg: 'Привет! Мы онлайн', time: '12:01', avatar: 'F' },
    { id: '2', name: 'Избранное', msg: 'Сообщения себе', time: '10:45', avatar: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 pt-12 pb-2 bg-white/90 backdrop-blur-md sticky top-0 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <button className="text-[#0088cc] font-medium text-lg">Изм.</button>
          <h1 className="font-bold text-lg">Чаты</h1>
          <button className="text-[#0088cc]"><Edit size={22} /></button>
        </div>
        <div className="mt-2 bg-gray-100 flex items-center gap-2 px-3 py-1.5 rounded-xl">
          <Search size={16} className="text-gray-400" />
          <input className="bg-transparent outline-none text-sm w-full" placeholder="Поиск" />
        </div>
      </div>

      <div className="flex flex-col">
        {chats.map(chat => (
          <Link to={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-3 p-3 tg-tap border-b border-gray-100 ml-4 pl-0">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {chat.avatar}
            </div>
            <div className="flex-1 pr-4">
              <div className="flex justify-between">
                <span className="font-bold text-[16px]">{chat.name}</span>
                <span className="text-sm text-gray-400">{chat.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.msg}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
