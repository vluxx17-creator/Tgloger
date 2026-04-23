import { useState } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (type) => {
    setLoading(true);
    const { error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    
    if (error) {
      alert(error.message);
    } else if (type === 'signup') {
      alert('Регистрация успешна! Теперь вы можете войти.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
      {/* Логотип Flygramm */}
      <div className="w-20 h-20 bg-[#0088cc] rounded-[22px] mb-8 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-200">
        F
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-black">Flygramm</h1>
      <p className="text-gray-400 mb-8 text-center text-sm">Введите данные для входа</p>
      
      <div className="w-full space-y-3">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#0088cc]"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          className="w-full bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#0088cc]"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button 
        onClick={() => handleAuth('login')} 
        disabled={loading}
        className="w-full bg-[#0088cc] text-white p-4 rounded-2xl font-bold mt-8 active:scale-95 transition-transform disabled:opacity-50"
      >
        {loading ? 'Загрузка...' : 'Войти'}
      </button>

      <button 
        onClick={() => handleAuth('signup')} 
        className="mt-4 text-[#0088cc] font-bold text-sm"
      >
        Создать аккаунт
      </button>

      <p className="mt-auto text-gray-300 text-xs tracking-widest uppercase">Flygramm Version 1.0</p>
    </div>
  );
}
