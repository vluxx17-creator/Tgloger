import { Link } from 'react-router-dom';

const MOCK_CHATS = [
  { id: '1', name: 'Flygramm News', lastMsg: 'Добро пожаловать!', time: '12:45', avatar: 'https://pravatar.cc' },
  { id: '2', name: 'Алексей', lastMsg: '🎤 Голосовое сообщение', time: '10:20', avatar: 'https://pravatar.cc' },
];

export default function Chats() {
  return (
    <div className="flex flex-col bg-white h-full">
      {MOCK_CHATS.map(chat => (
        <Link to={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 border-b border-gray-100">
          <img src={chat.avatar} className="w-14 h-14 rounded-full" alt="avatar" />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">{chat.name}</h3>
              <span className="text-xs text-gray-400">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
