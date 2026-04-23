import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

export default function Contacts() {
  const [search, setSearch] = useState('');
  const users = [{ id: 1, name: 'Support Flygramm', tag: '@fly_support' }];

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input 
          className="w-full bg-gray-100 rounded-xl py-2 pl-10 pr-4 outline-none"
          placeholder="Поиск по юзернейму..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-3 text-blue-500 font-medium p-2 border-b border-gray-50">
           <UserPlus size={20} /> <span>Пригласить друзей</span>
        </div>
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-3 p-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-sm">{u.name}</p>
              <p className="text-xs text-gray-400">{u.tag}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
