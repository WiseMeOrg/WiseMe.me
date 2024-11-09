"use client";

import { useState, useRef } from 'react';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const emailRef = useRef("");

  const placeholders = [
    "Learn the wise way! Email.",
    "Enter your email"
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    emailRef.current = value;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(emailRef.current)) {
      return;
    }

    try {
      const response = await fetch("https://api.wiseme.me/api/v1/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailRef.current }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Submission successful:", data);
        setShowSuccessMessage(true);
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
        emailRef.current = "";
      } else {
        console.error("Error submitting:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="h-[45rem] mt-[-31rem] md:mt-[-29rem] flex flex-col justify-center items-center px-4">
      {!showSuccessMessage ? (
        <>
          <h2 className="mb-16 z-10 sm:mb-20 md:text-xl text-center text-lg md:w-[50vw] dark:text-white text-white">
            Join us to get early access, notified as soon as registration opens, priority access to our platform
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </>
      ) : (
        <h2 className="mb-16 z-10 sm:mb-20 md:text-xl text-center text-lg md:w-[50vw] dark:text-white text-white">
          Welcome to path of becoming a Wise learner
        </h2>
      )}
    </div>
  );
}