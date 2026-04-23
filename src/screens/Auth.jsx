import { useState } from 'react';
import { supabase } from '../supabase';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (type) => {
    const { error } = type === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
      <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">F</div>
      <input className="w-full bg-gray-100 p-4 rounded-xl mb-3 outline-none" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full bg-gray-100 p-4 rounded-xl mb-6 outline-none" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleAuth('login')} className="w-full bg-blue-500 text-white p-4 rounded-xl font-bold mb-3">Войти</button>
      <button onClick={() => handleAuth('signup')} className="text-blue-500 text-sm font-bold">Создать аккаунт</button>
    </div>
  );
}
