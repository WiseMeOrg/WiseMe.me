"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2, Send, Mic } from 'lucide-react';

const New = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'What tech do you want to learn?',
      options: ['Python', 'Python', 'Python', 'Python', 'Python', 'Python',
                'Python', 'Python', 'Python', 'Python', 'Python', 'Python',
                ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  const timeOptions = ['3 days', '5 days', '1 week', '2 week', '3 weeks', 'Customise'];

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    setMessages([
      ...messages,
      { 
        type: 'user', 
        content: `I want to learn ${tech}`,
        timestamp: 'Just now'
      },
      {
        type: 'bot',
        content: `In how much time do you want to complete ${tech}?`,
        options: timeOptions
      }
    ]);
  };

  const handleTimeSelect = async (time) => {
    setMessages([
      ...messages,
      { 
        type: 'user', 
        content: `I want to complete within ${time}`,
        timestamp: 'Just now'
      }
    ]);
    
    setIsLoading(true);
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      // router.push('/learning-path/123');
    }, 2000);
  };

  return (
    <div className="h-[90vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll px-4 space-y-6">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {message.type === 'user' ? (
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xs text-gray-400">{message.timestamp}</span> */}
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
                    {/* <span className="text-xs text-gray-400">Just now</span> */}
                  </div>
                  <div className="bg-[#2B2D31] text-white rounded-lg p-3 max-w-[80%]">
                    {message.content}
                    {message.options && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.options.map((option, optionIndex) => (
                          <motion.button
                            key={optionIndex}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => 
                              message.content.includes('time') 
                                ? handleTimeSelect(option)
                                : handleTechSelect(option)
                            }
                            className="bg-[#1e1f227f] hover:bg-[#2B2D31] text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
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

      {/* Input area */}
      <div className="p-4 ">
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

      {/* Loading overlay */}
      {/* {isLoading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-8 h-8 text-blue-500" />
          </motion.div>
        </motion.div>
      )} */}
    </div>
  );
};

export default New;