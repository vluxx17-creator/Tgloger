import { useState } from 'react';
import { Camera, Lock, Palette, Crown, ChevronRight, Bell, Globe } from 'lucide-react';

export default function Settings() {
  const [name, setName] = useState('Александр');
  const [bio, setBio] = useState('Создаю будущее в Flygramm');
  const [themeColor, setThemeColor] = useState('#0088cc');

  const colors = [
    { name: 'Синий', hex: '#0088cc' },
    { name: 'Зеленый', hex: '#249d58' },
    { name: 'Розовый', hex: '#e3407e' },
    { name: 'Фиолетовый', hex: '#8e44ad' },
    { name: 'Оранжевый', hex: '#f39c12' }
  ];

  return (
    <div className="bg-[#f1f1f1] min-h-full pb-10">
      {/* Профиль в стиле macOS */}
      <div className="bg-white p-6 flex flex-col items-center border-b">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-tgBlue to-blue-300 flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
            {name[0]}
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 text-tgBlue">
            <Camera size={16} />
          </button>
        </div>
        
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="mt-4 text-xl font-bold text-center bg-transparent border-none focus:ring-0 w-full"
        />
        <input 
          value={bio} 
          onChange={(e) => setBio(e.target.value)}
          className="text-gray-500 text-sm text-center bg-transparent border-none focus:ring-0 w-full"
        />
      </div>

      {/* Секция: Flygramm Premium */}
      <div className="mt-4 mx-4 p-4 rounded-2xl bg-gradient-to-br from-[#6a5af9] via-[#d662ff] to-[#ff62c3] text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg">
              <Crown size={20} /> Flygramm Premium
            </div>
            <p className="text-[10px] opacity-90 mt-1">Эксклюзивные цвета и функции</p>
          </div>
          <button className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">Узнать больше</button>
        </div>
        {/* Декоративный круг на фоне */}
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Настройки (Список в стиле macOS) */}
      <div className="mt-6 bg-white border-y divide-y">
        {/* Изменение пароля */}
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Lock size={18} className="text-gray-600 group-hover:text-tgBlue" />
            </div>
            <span className="text-sm font-medium">Изменить пароль</span>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>

        {/* Кастомизация цвета */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-lg">
              <Palette size={18} className="text-gray-600" />
            </div>
            <span className="text-sm font-medium">Цвет оформления</span>
          </div>
          <div className="flex justify-between px-2">
            {colors.map((c) => (
              <button 
                key={c.hex}
                onClick={() => setThemeColor(c.hex)}
                className={`w-8 h-8 rounded-full transition-transform active:scale-90 ${themeColor === c.hex ? 'ring-4 ring-blue-100 scale-110' : ''}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Уведомления и язык */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg"><Bell size={18} /></div>
            <span className="text-sm font-medium">Уведомления</span>
          </div>
          <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg"><Globe size={18} /></div>
            <span className="text-sm font-medium">Язык</span>
          </div>
          <span className="text-sm text-gray-400">Русский</span>
        </div>
      </div>

      <div className="mt-8 text-center text-[10px] text-gray-400 font-medium">
        Flygramm for Web v1.0.0
      </div>
    </div>
  );
}
