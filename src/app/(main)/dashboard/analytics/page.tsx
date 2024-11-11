"use client"
import React from "react";
import { motion } from 'framer-motion';

const AnalyticsPage = () => {
  return (
    <div className="p-16">
      <div className="mt-20 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-xl mx-auto"
        >
          {/* Background circles */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-[#6EC1E4] rounded-full blur-3xl opacity-20" />
          <div className="absolute -top-24 left-1/3 w-48 h-48 sm:w-72 sm:h-72 bg-purple-400 rounded-full blur-3xl opacity-20" />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 sm:p-16 shadow-2xl"
          >
            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-4xl md:text-6xl font-bold text-[#6EC1E4] tracking-wider text-center"
              initial={{ letterSpacing: "0.01em", y: 20, opacity: 0 }}
              animate={{ letterSpacing: "0.01em", y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              COMING
            </motion.h1>
            <motion.h1
              className="text-4xl sm:text-4xl md:text-6xl font-bold text-[#6EC1E4] tracking-wider mt-4 text-center"
              initial={{ letterSpacing: "0.01em", y: 20, opacity: 0 }}
              animate={{ letterSpacing: "0.01em", y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              SOON
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="h-[2px] bg-[#6EC1E4]/30 mt-8 mx-4"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
