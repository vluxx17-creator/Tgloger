import { useState } from 'react';
import { Search, Megaphone, UserPlus } from 'lucide-react';

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Пример данных (позже заменим на данные из Firebase)
  const users = [
    { id: 1, name: 'Иван Иванов', username: '@vanya', avatar: 'https://pravatar.cc' },
    { id: 2, name: 'Мария Сидорова', username: '@mary', avatar: 'https://pravatar.cc' },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Поле поиска */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        <input 
          type="text"
          placeholder="Поиск людей..."
          className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-tgBlue"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Быстрые действия */}
      <div className="space-y-4 mb-6">
        <button className="flex items-center gap-4 text-tgBlue font-medium w-full">
          <div className="bg-blue-100 p-2 rounded-full"><Megaphone size={20} /></div>
          <span>Создать канал</span>
        </button>
        <button className="flex items-center gap-4 text-tgBlue font-medium w-full">
          <div className="bg-blue-100 p-2 rounded-full"><UserPlus size={20} /></div>
          <span>Пригласить друзей</span>
        </button>
      </div>

      {/* Список пользователей */}
      <div className="space-y-4">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Контакты</p>
        {filteredUsers.map(user => (
          <div key={user.id} className="flex items-center gap-3 border-b border-gray-50 pb-3">
            <img src={user.avatar} className="w-12 h-12 rounded-full shadow-sm" alt="avatar" />
            <div>
              <div className="font-bold text-sm">{user.name}</div>
              <div className="text-gray-500 text-xs">{user.username}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
