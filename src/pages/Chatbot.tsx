import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I could not process that.' }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-blue-600 text-white p-2 rounded-t-xl text-sm font-semibold">
            Aurora Assistant
          </div>
          <div className="flex-1 p-2 overflow-y-auto text-sm text-gray-800 dark:text-gray-200">
            {messages.length === 0 ? (
              <p>Hello! How can I assist you today?</p>
            ) : (
              messages.map((msg, i) => (
                <p key={i} className={`mb-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`px-2 py-1 inline-block rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}>
                    {msg.text}
                  </span>
                </p>
              ))
            )}
          </div>
          <div className="p-2 border-t dark:border-gray-700">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full px-3 py-1 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-transform animate-bounce"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
