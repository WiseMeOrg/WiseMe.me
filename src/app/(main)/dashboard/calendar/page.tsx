"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Dummy task data with labels - using opacity classes for better color adaptation
const dummyTasks = {
  "2024-11-10": [
    { id: 1, title: "Team Meeting", label: "Work", color: "bg-blue-500/90" },
    { id: 2, title: "Project Review", label: "Important", color: "bg-red-500/90" }
  ],
  "2024-11-15": [
    { id: 3, title: "Go", label: "Meeting", color: "bg-green-500/90" },
    { id: 4, title: "DSA", label: "Meeting", color: "bg-green-500/90" }
  ],
  "2024-11-20": [
    { id: 4, title: "Code Review", label: "Development", color: "bg-purple-500/90" },
    { id: 5, title: "Deploy Updates", label: "Development", color: "bg-purple-500/90" }
  ],
  "2024-11-08": [
    { id: 6, title: "Python", label: "Personal", color: "bg-yellow-500/90" }
  ],
  "2024-11-12": [
    { id: 7, title: "Python", label: "Social", color: "bg-pink-500/90" },
    { id: 8, title: "DSA", label: "Work", color: "bg-blue-500/90" }
  ]
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(10);
  const [currentYear, setCurrentYear] = useState(2024);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getTasksForDate = (date) => {
    const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
    return dummyTasks[dateString] || [];
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const weeks = [];
  let days = [];
  
  // Add padding for first week
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(
      <td key={`empty-${i}`} className="relative w-24 h-24 border dark:border-gray-600 border-gray-200 p-1">
        <div className="absolute inset-1 dark:bg-gray-800/50 bg-gray-100/50 rounded"></div>
      </td>
    );
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const tasks = getTasksForDate(day);
    const isToday = day === 10;

    days.push(
      <td key={day} className="relative w-24 h-24 border dark:border-gray-600 border-gray-200 p-1">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`absolute inset-1 rounded overflow-hidden ${
            isToday 
              ? 'dark:bg-gray-700 bg-gray-200' 
              : 'dark:bg-gray-800 bg-white'
          }`}
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <span className={`font-bold text-sm ${
                isToday 
                  ? 'dark:text-white text-gray-900' 
                  : 'dark:text-gray-300 text-gray-700'
              }`}>
                {day}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto mt-1 task-container space-y-0.5">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${task.color} p-1 rounded text-white text-xs shadow-sm`}
                >
                  <div className="font-medium truncate text-[10px]">{task.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </td>
    );

    if ((firstDayOfMonth + day) % 7 === 0 || day === daysInMonth) {
      weeks.push(
        <motion.tr
          key={day}
          variants={rowVariants}
          className="h-24"
        >
          {days}
        </motion.tr>
      );
      days = [];
    }
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 min-h-screen "
      >
        <Card className="w-full max-w-5xl mx-auto border-gray-300 dark:border-gray-600 dark:bg-gray-900 bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white text-gray-900">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </h2>
              <div className="flex gap-2 items-center">
                {/* <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="dark:border-gray-600"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button> */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="bg-[#6EC1E4] bg-opacity-70 border-none"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="bg-[#6EC1E4] bg-opacity-70 border-none "
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <th key={day} className="p-2 border dark:border-gray-600 border-gray-200 dark:text-gray-400 text-gray-500 w-24 text-sm">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants}>
                  {weeks}
                </motion.tbody>
              </table>
            </div>

            <style jsx>{`
              .task-container {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .task-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Calendar;