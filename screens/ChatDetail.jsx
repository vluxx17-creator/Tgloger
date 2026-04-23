import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { ChevronLeft, Send, Mic, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatDetail() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    const channel = supabase.channel('realtime-messages').on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'messages' }, 
      (payload) => { setMessages((prev) => [...prev, payload.new]); }
    ).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const sendMessage = async (type = 'text', content = input) => {
    if (!content && type === 'text') return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('messages').insert([{ text: content, sender: user?.email || 'Гость', type }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5] fixed inset-0 z-50">
      <div className="bg-white p-3 flex items-center gap-3 border-b shadow-sm">
        <button onClick={() => navigate(-1)}><ChevronLeft className="text-blue-500" /></button>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">F</div>
        <div className="flex-1 text-sm font-bold">Чат Flygramm</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${m.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              <p className="text-xs opacity-50 mb-1">{m.sender}</p>
              {m.type === 'text' && <p className="text-sm">{m.text}</p>}
              {m.type === 'photo' && <img src={m.text} className="rounded-lg" />}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-3 pb-8 flex items-center gap-2 border-t">
        <input className="flex-1 bg-gray-100 rounded-full px-4 py-2 outline-none" placeholder="Сообщение" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => sendMessage()} className="bg-blue-500 text-white p-2 rounded-full"><Send size={20} /></button>
      </div>
    </div>
  );
}
