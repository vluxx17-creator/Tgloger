import { useState } from 'react';
import { supabase } from '../supabase';
import { Crown, Lock, Palette, LogOut } from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState('#0088cc');

  return (
    <div className="bg-gray-50 min-h-full pb-10">
      <div className="bg-white p-10 flex flex-col items-center border-b">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">F</div>
        <h2 className="mt-4 text-xl font-bold">Пользователь</h2>
      </div>

      <div className="mt-4 mx-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="flex items-center gap-2 font-bold"><Crown size={20} /> Flygramm Premium</div>
        <p className="text-xs mt-1 opacity-80">Уникальные возможности оформления</p>
      </div>

      <div className="mt-6 bg-white divide-y border-y text-sm">
        <div className="p-4 flex justify-between items-center cursor-pointer"><span>Безопасность</span><Lock size={16} className="text-gray-400" /></div>
        <div className="p-4">
          <p className="text-gray-400 text-[10px] uppercase font-bold mb-3">Цвет оформления</p>
          <div className="flex gap-4">
            {['#0088cc', '#249d58', '#e3407e'].map(c => (
              <div key={c} onClick={() => setTheme(c)} className="w-8 h-8 rounded-full cursor-pointer border-2" style={{ backgroundColor: c, borderColor: theme === c ? 'black' : 'transparent' }}></div>
            ))}
          </div>
        </div>
        <div onClick={() => supabase.auth.signOut()} className="p-4 flex items-center gap-2 text-red-500 font-bold cursor-pointer hover:bg-red-50">
          <LogOut size={16} /> Выйти из аккаунта
        </div>
      </div>
    </div>
  );
}
