import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  abilities: string[];
  color: string;
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
    abilities: ['Event Planning', 'Activity Recommendations', 'Schedule Management'],
    color: 'blue'
  },
  {
    id: 'athena',
    name: 'Athena',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=athena',
    abilities: ['Real Estate/Investment', 'Property Analysis', 'Market Insights'],
    color: 'purple'
  },
  {
    id: 'nova',
    name: 'Nova',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=nova',
    abilities: ['Booking and Logistics', 'Travel Planning', 'Transportation'],
    color: 'green'
  },
  {
    id: 'atlas',
    name: 'Atlas',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=atlas',
    abilities: ['Place Discovery', 'Local Recommendations', 'Cultural Insights'],
    color: 'orange'
  },
  {
    id: 'luna',
    name: 'Luna',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=luna',
    abilities: ['Entertainment Guide', 'Activity Matching', 'Social Planning'],
    color: 'pink'
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
        text: `This is a response from ${selectedAgent?.name || 'the bot'} about ${selectedAgent?.abilities[0] || 'general topics'}`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - AI Agents */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col py-6">
        <h2 className="px-6 text-lg font-semibold text-slate-800 mb-4">AI Agents</h2>
        <div className="space-y-4 px-4">
          {agents.map(agent => (
            <div key={agent.id} className="space-y-2">
              <button
                onClick={() => setSelectedAgent(agent)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  selectedAgent?.id === agent.id 
                    ? `bg-${agent.color}-50 border-2 border-${agent.color}-500` 
                    : 'hover:bg-slate-50 border-2 border-transparent'
                }`}
              >
                <img 
                  src={agent.avatar} 
                  alt={agent.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div className="font-medium text-slate-800">{agent.name}</div>
                  <div className="text-sm text-slate-500">{agent.abilities[0]}</div>
                </div>
              </button>
              
              {selectedAgent?.id === agent.id && (
                <div className="pl-16 space-y-1">
                  {agent.abilities.map((ability, index) => (
                    <div 
                      key={index}
                      className={`text-sm py-1 px-3 rounded-full bg-${agent.color}-50 text-${agent.color}-700 inline-block mr-2 mb-2`}
                    >
                      {ability}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section - Chat */}
      <div className="flex-1 flex flex-col max-h-screen">
        {/* Chat Header */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          {selectedAgent ? (
            <div className="flex items-center">
              <img 
                src={selectedAgent.avatar} 
                alt={selectedAgent.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <div className="font-medium text-slate-800">{selectedAgent.name}</div>
                <div className="text-sm text-slate-500">{selectedAgent.abilities[0]}</div>
              </div>
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
        <div className="bg-white border-t border-slate-200 p-4">
          <div className="flex items-center gap-4">
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