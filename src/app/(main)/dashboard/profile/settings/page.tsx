"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl text-white font-semibold mb-4">Settings</h1>
      <div className="my-8 mx-8">
        <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1], }}>
          <h1 className="text-xl text-gray-400 font-semibold mb-4">Privacy Policy</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.8,delay:0.6, ease: [0.4, 0.0, 0.2, 1], }}>

        <div className="bg-white dark:bg-[#292A2E] dark:bg-opacity-35 text-black dark:text-white p-6 rounded-lg shadow-lg">

          <p className="mb-4 mx-4 text-gray-400 text-sm font-light">
            At WiseMe, we collect personal and usage data to improve your experience. We do not sell your data but may share it with trusted service providers. <br />

            We take reasonable steps to protect your data but cannot guarantee complete security. You can access, update, or delete your data anytime.
            <br />
            For questions, contact: wiseme.me</p>
        </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 1.2,delay:0.6, ease: [0.4, 0.0, 0.2, 1], }}>
        <Button type="submit" className=" bg-red-700 mt-16 py-6 bg-opacity-60 hover:bg-red-800 text-white"
                >
                  Delete All Roadmaps
                </Button>
                
        </motion.div>




      </div>
    </div>
  );
};

export default Settings;
