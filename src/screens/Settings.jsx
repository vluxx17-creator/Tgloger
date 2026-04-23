import { supabase } from '../supabase';
import { Camera, ChevronRight, Bell, Lock, Globe, LogOut, Crown } from 'lucide-react';

export default function Settings() {
  const MenuLink = ({ icon: Icon, title, extra, color, onClick }) => (
    <div onClick={onClick} className="flex items-center gap-3 py-3 px-4 bg-white ios-tap cursor-pointer border-b border-gray-100 last:border-0">
      <div className={`${color} p-1.5 rounded-lg text-white`}>
        <Icon size={18} fill="currentColor" />
      </div>
      <span className="flex-1 text-[16px]">{title}</span>
      <div className="flex items-center gap-1 text-gray-400">
        <span className="text-sm">{extra}</span>
        <ChevronRight size={16} />
      </div>
    </div>
  );

  return (
    <div className="bg-[#f1f1f2] min-h-screen">
      {/* Профиль */}
      <div className="bg-white pt-16 pb-6 flex flex-col items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-blue-300 flex items-center justify-center text-white text-4xl font-bold">U</div>
          <button className="absolute bottom-0 right-0 bg-gray-100 p-1.5 rounded-full border-4 border-white"><Camera size={16} /></button>
        </div>
        <h2 className="mt-4 text-2xl font-bold">User Name</h2>
        <p className="text-gray-400 text-sm">@username • +7 999 ...</p>
      </div>

      {/* Меню */}
      <div className="mt-8">
        <MenuLink icon={Crown} title="Flygramm Premium" color="bg-purple-500" />
      </div>

      <div className="mt-8 bg-white border-y border-gray-200">
        <MenuLink icon={Bell} title="Уведомления" color="bg-red-500" />
        <MenuLink icon={Lock} title="Конфиденциальность" color="bg-gray-400" />
        <MenuLink icon={Globe} title="Язык" extra="Русский" color="bg-green-500" />
      </div>

      <div className="mt-8 bg-white border-y border-gray-200">
        <MenuLink 
          icon={LogOut} 
          title="Выйти" 
          color="bg-orange-500" 
          onClick={() => supabase.auth.signOut()} 
        />
      </div>
    </div>
  );
}
