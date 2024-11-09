"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2, Send, Mic } from 'lucide-react';

const New = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: 'What tech do you want to learn?',
      options: ['Python', 'Python', 'Python', 'Python', 'Python', 'Python',
                'Python', 'Python', 'Python', 'Python', 'Python', 'Python'],
      answered: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  const timeOptions = ['3 days', '5 days', '1 week', '2 week', '3 weeks', 'Customise'];

  const handleTechSelect = (tech, messageId) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, answered: true } : msg
      )
    );

    setSelectedTech(tech);
    setMessages(prevMessages => [
      ...prevMessages,
      { 
        id: Date.now().toString() + '1',
        type: 'user', 
        content: `I want to learn ${tech}`,
        timestamp: 'Just now'
      },
      {
        id: Date.now().toString() + '2',
        type: 'bot',
        content: `In how much time do you want to complete ${tech}?`,
        options: timeOptions,
        answered: false
      }
    ]);
  };

  const handleTimeSelect = async (time, messageId) => {
    setMessages(prevMessages => [
      ...prevMessages.map(msg => 
        msg.id === messageId ? { ...msg, answered: true } : msg
      ),
      { 
        id: Date.now().toString() + '1',
        type: 'user', 
        content: `I want to complete within ${time}`,
        timestamp: 'Just now'
      }
    ]);

    // Add loading message with GIF and keep it visible
    const loadingMessageId = Date.now().toString() + '2';
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: loadingMessageId,
        type: 'bot',
        content: 'Crafting your journey...',
        isLoading: true,
        gif: true
      }
    ]);
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/get-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          technology: selectedTech,
          duration: time
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch course data');
      }

      const data = await response.json();
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          type: 'bot',
          content: 'Your learning path is ready!',
          timestamp: 'Just now'
        }
      ]);

      router.push(`/learning-path/${data.id}`);
    } catch (error) {
      console.error('Error:', error);
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          type: 'bot',
          content: 'Sorry, there was an error creating your learning path. Please try again.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll px-4 space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === 'user' ? (
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white">You</span>
                      <div className="w-8 h-8 rounded-full bg-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-[#2B2D31] text-white rounded-lg p-3 max-w-[80%]">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500" />
                    <span className="text-white">Response</span>
                  </div>
                  <div className="bg-[#2B2D31] text-white rounded-lg p-3 max-w-[80%]">
                    {message.content}
                    {message.gif && (
                      <div className="mt-4">
                        <img 
                          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                          alt="Loading animation"
                          className="rounded-lg"
                        />
                      </div>
                    )}
                    {message.options && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.options.map((option, optionIndex) => (
                          <motion.button
                            key={optionIndex}
                            whileHover={{ scale: message.answered ? 1 : 1.05 }}
                            whileTap={{ scale: message.answered ? 1 : 0.95 }}
                            onClick={() => 
                              !message.answered && (
                                message.content.includes('time') 
                                  ? handleTimeSelect(option, message.id)
                                  : handleTechSelect(option, message.id)
                              )
                            }
                            disabled={message.answered}
                            className={`bg-[#1e1f227f] text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1
                              ${message.answered 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-[#2B2D31] cursor-pointer'}`}
                          >
                            <span className="text-yellow-500">⚡</span>
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              disabled
              type="text"
              placeholder="Ask questions, or type / for commands"
              className="w-full bg-[#2B2D31] text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-400">
                <path
                  fill="currentColor"
                  d="M3.293 3.293a1 1 0 011.414 0L12 10.586l7.293-7.293a1 1 0 111.414 1.414L13.414 12l7.293 7.293a1 1 0 01-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 01-1.414-1.414L10.586 12 3.293 4.707a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
          <button className="p-3 bg-[#2B2D31] text-gray-400 rounded-lg hover:text-white transition-colors">
            <Send size={20} />
          </button>
          <button className="p-3 bg-[#2B2D31] text-gray-400 rounded-lg hover:text-white transition-colors">
            <Mic size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default New;
