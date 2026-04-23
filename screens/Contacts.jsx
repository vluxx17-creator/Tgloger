import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

export default function Contacts() {
  const [search, setSearch] = useState('');
  const users = [{ id: 1, name: 'Служба поддержки', tag: '@support' }];

  return (
    <div className="p-4 bg-white h-full">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input className="w-full bg-gray-100 rounded-xl py-2 pl-10 outline-none" placeholder="Поиск людей..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-blue-500 font-bold p-2"><UserPlus size={20} /> Пригласить друзей</div>
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-3 p-2 border-b border-gray-50">
            <div className="w-12 h-12 bg-blue-100 rounded-full"></div>
            <div><p className="font-bold text-sm">{u.name}</p><p className="text-xs text-gray-400">{u.tag}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
