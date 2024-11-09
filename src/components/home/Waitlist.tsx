"use client";

import { useState, useRef } from 'react';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { z } from 'zod';

export function PlaceholdersAndVanishInputDemo() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "error" });
  const emailRef = useRef("");

  const placeholders = [
    "Learn the wise way! Email.",
    "Enter your email"
  ];

  const emailSchema = z.string().email().refine((email) => {
    const [localPart, domain] = email.split('@');
    
    if (localPart.length > 64 || domain.length > 255) return false;
    
    const domainParts = domain.split('.');
    if (domainParts.length < 2) return false;
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) return false;
    
    const disposableDomains = ['tempmail.com', 'throwaway.com'];
    if (disposableDomains.some(d => domain.includes(d))) return false;
    
    return true;
  }, "Please enter a valid email address");

  const validateEmail = (email: string) => {
    const result = emailSchema.safeParse(email);
    return {
      success: result.success,
      error: result.success ? null : result.error.issues[0]?.message
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    emailRef.current = value;
    if (statusMessage.text) {
      setStatusMessage({ text: "", type: "error" });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = validateEmail(emailRef.current);
    if (!validationResult.success) {
      setStatusMessage({ 
        text: validationResult.error || "Please enter a valid email address",
        type: "error"
      });
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
        setStatusMessage({ 
          text: "You have joined the waitlist!",
          type: "success"
        });
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
        emailRef.current = "";
      } else {
        if (response.status === 400) {
          setStatusMessage({ 
            text: "Email is already registered",
            type: "error"
          });
        } else {
          setStatusMessage({ 
            text: "Something went wrong. Please try again later",
            type: "error"
          });
        }
        console.error("Error submitting:", data);
      }
    } catch (error) {
      setStatusMessage({ 
        text: "Connection error. Please try again later.",
        type: "error"
      });
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="h-[45rem] mt-[-31rem] md:mt-[-29rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-16 z-10 sm:mb-20 md:text-xl text-center text-lg md:w-[50vw] dark:text-white text-white">
        Join us to get early access, notified as soon as registration opens, priority access to our platform
      </h2>
      {statusMessage.text && (
        <div className={`mb-4 text-center ${
          statusMessage.type === "success" 
            ? "text-green-500 dark:text-green-400" 
            : "text-red-500 dark:text-red-400"
        }`}>
          {statusMessage.text}
        </div>
      )}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}