import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  topics: string[];
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const agents: Agent[] = [
  {
    id: 'mark',
    name: 'Mark',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=mark',
    topics: ['AI Research', 'Data Science', 'Machine Learning']
  },
  {
    id: 'athena',
    name: 'Athena',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=athena',
    topics: ['Natural Language Processing', 'Computer Vision', 'Robotics']
  }
];

const topics = [
  'Forum',
  'Offre',
  'History',
  'Topics',
  'Visios',
  'Support',
  'News'
];

const ChatbotPage: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a response from ${selectedAgent?.name || 'the bot'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - AI Agents */}
      <div className="w-24 bg-white border-r border-slate-200 flex flex-col items-center py-6 space-y-6">
        {agents.map(agent => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-colors ${
              selectedAgent?.id === agent.id 
                ? 'border-blue-500 shadow-lg' 
                : 'border-transparent hover:border-blue-200'
            }`}
          >
            <img 
              src={agent.avatar} 
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Middle Section - Chat */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          {selectedAgent ? (
            <div className="flex items-center">
              <img 
                src={selectedAgent.avatar} 
                alt={selectedAgent.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <span className="font-medium text-slate-800">{selectedAgent.name}</span>
            </div>
          ) : (
            <span className="text-slate-500">Select an AI agent to start chatting</span>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-800 border border-slate-200'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="h-24 bg-white border-t border-slate-200 p-4">
          <div className="flex items-center gap-4 h-full">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Topics */}
      <div className="w-24 bg-white border-l border-slate-200 flex flex-col items-center py-6">
        {topics.map(topic => (
          <div
            key={topic}
            className="w-full h-24 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
          >
            <span 
              className="transform -rotate-90 whitespace-nowrap text-slate-600 hover:text-blue-600 transition-colors"
              style={{ transformOrigin: 'center' }}
            >
              {topic}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotPage;