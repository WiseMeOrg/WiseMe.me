'use client'

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from "framer-motion";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-8 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-20 flex flex-col items-center bg-[#D9D9D9] bg-opacity-20 rounded-full cursor-pointer p-1 py-2"
    >
      {/* Animated Circle */}
      <motion.div
        className={`absolute w-6 h-8 rounded-xl ${isDark ? 'bg-[#707279]' : 'bg-white'}`}
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          top: isDark ? 'calc(100% - 39px)' : '5px',
        }}
      />
      
      {/* Sun and Moon icons */}
      <div className="relative flex flex-col justify-between h-full py-1 gap-2">
        <FiSun className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
        <FiMoon className={`w-5 h-5 ${isDark ? 'text-white' : 'text-gray-400'}`} />
      </div>
    </div>
  );
}
