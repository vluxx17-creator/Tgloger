import { useState, useRef } from 'react';
import { ChevronLeft, Paperclip, Mic, Send, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatDetail() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Привет! Это Flygramm. Попробуй отправить фото или ГС.", type: 'text', sender: 'other' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (type = 'text', content = input) => {
    if (!content && type === 'text') return;
    const newMsg = {
      id: Date.now(),
      text: content,
      type: type,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] fixed inset-0 z-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white p-3 flex items-center gap-3 border-b shadow-sm">
        <button onClick={() => navigate(-1)}><ChevronLeft className="text-tgBlue" /></button>
        <div className="w-10 h-10 bg-tgBlue rounded-full text-white flex items-center justify-center font-bold">A</div>
        <div className="flex-1">
          <p className="font-bold text-sm">Алексей</p>
          <p className="text-[10px] text-green-500 font-medium">в сети</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl shadow-sm ${
              m.sender === 'me' ? 'bg-tgBlue text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'
            }`}>
              {m.type === 'text' && <p className="text-sm">{m.text}</p>}
              {m.type === 'photo' && <img src={m.text} alt="sent" className="rounded-lg max-h-60 w-full object-cover" />}
              {m.type === 'audio' && (
                <div className="flex items-center gap-2 py-1 px-2">
                  <div className="bg-white/20 p-1 rounded-full">▶️</div>
                  <div className="h-1 w-24 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-1/3"></div>
                  </div>
                  <span className="text-[10px]">0:05</span>
                </div>
              )}
              <p className={`text-[9px] text-right mt-1 ${m.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white p-2 pb-6 flex items-center gap-2 border-t">
        <button className="text-gray-400 p-2"><Paperclip size={22} /></button>
        <input 
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="Сообщение"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center">
          {input ? (
            <button onClick={() => sendMessage()} className="bg-tgBlue text-white p-2 rounded-full shadow-md">
              <Send size={18} />
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => sendMessage('photo', 'https://picsum.photos')} className="text-gray-400 p-2">
                <ImageIcon size={22} />
              </button>
              <button onClick={() => sendMessage('audio', 'voice')} className="text-gray-400 p-2">
                <Mic size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
