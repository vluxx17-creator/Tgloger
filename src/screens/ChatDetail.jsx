import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { ChevronLeft, Send, Mic, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatDetail() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // 1. Загрузка сообщений и подписка на новые
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    const channel = supabase.channel('realtime-messages').on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'messages' }, 
      (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      }
    ).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // 2. Функция отправки
  const sendMessage = async (type = 'text', content = input) => {
    if (!content && type === 'text') return;
    const { error } = await supabase.from('messages').insert([
      { text: content, sender: 'me', type: type }
    ]);
    if (error) console.error(error);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5] fixed inset-0 max-w-md mx-auto">
      <div className="bg-white p-3 flex items-center gap-3 border-b shadow-sm">
        <button onClick={() => navigate(-1)}><ChevronLeft className="text-blue-500" /></button>
        <div className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold font-mono text-xl">F</div>
        <div>
          <p className="font-bold text-sm leading-none">Flygramm Chat</p>
          <span className="text-[10px] text-green-500 font-bold">online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${m.sender === 'me' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
              {m.type === 'text' && <p className="text-sm">{m.text}</p>}
              {m.type === 'photo' && <img src={m.text} alt="img" className="rounded-lg max-h-48" />}
              {m.type === 'audio' && <p className="text-xs italic">🎤 Голосовое сообщение</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 pb-8 flex items-center gap-2 border-t">
        <input 
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="Сообщение"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        {input ? (
          <button onClick={() => sendMessage()} className="bg-blue-500 text-white p-2 rounded-full"><Send size={18} /></button>
        ) : (
          <div className="flex gap-1">
            <button onClick={() => sendMessage('photo', 'https://picsum.photos')} className="text-gray-400 p-2"><ImageIcon size={20} /></button>
            <button onClick={() => sendMessage('audio', 'voice')} className="text-gray-400 p-2"><Mic size={20} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
