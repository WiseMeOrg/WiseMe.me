"use client";

import { useState, useRef } from 'react';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(emailRef.current)) {
      setErrorMessage("Please enter a valid email address");
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
        setErrorMessage("");
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
        emailRef.current = "";
      } else {
        if (response.status === 400) {
          setErrorMessage("Email is already registered");
        } else {
          setErrorMessage("Something went wrong. Please enter a valid email address");
        }
        console.error("Error submitting:", data);
      }
    } catch (error) {
      setErrorMessage("Connection error. Please try again later.");
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
          {errorMessage && (
            <div className="mb-4 text-red-500 dark:text-red-400 text-center">
              {errorMessage}
            </div>
          )}
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </>
      ) : (
        <div className="flex justify-center items-center p-8">
          <div className="relative rounded-lg bg-gradient-to-br from-gray-700 via-gray-800 to-black p-1 shadow-xl">
            <div className="bg-gradient-to-br from-gray-600/20 via-gray-700/20 to-gray-800/20 rounded-lg p-6 backdrop-blur-sm">
              <h2 className="mb-16 sm:mb-20 text-lg md:text-xl text-center md:w-[50vw] text-white font-semibold">
                Welcome to path of becoming a Wise learner
              </h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}