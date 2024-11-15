"use client";

import { useState, useRef } from 'react';
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { z } from 'zod';

export function PlaceholdersAndVanishInputDemo() {
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'error' | 'success' }>({
    text: "",
    type: "error"
  });
  const emailRef = useRef("");

  const placeholders = [
    "Learn the wise way! Email.",
    "Enter your email"
  ];

  // Common email domain typos
  const commonDomainTypos: { [key: string]: string } = {
    'gmil.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmail.co': 'gmail.com'
  };

  // Email validation schema using Zod's built-in email validation
  const emailSchema = z.string()
    .min(1, "Email is required")
    .trim()
    .toLowerCase()
    .email("Invalid email address. Please try again")
    .superRefine((email, ctx) => {
      const [, domain] = email.split('@');
      if (commonDomainTypos[domain]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Invalid email address. Did you mean @${commonDomainTypos[domain]}?`
        });
        return false;
      }
      return true;
    });

  const validateEmail = (email: string): { success: boolean; error: string } => {
    const result = emailSchema.safeParse(email);
    return {
      success: result.success,
      error: result.success ? "" : result.error.errors[0]?.message || "Invalid email address. Please try again"
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailRef.current = e.target.value;
    if (statusMessage.text) {
      setStatusMessage({ text: "", type: "error" });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = validateEmail(emailRef.current);
    if (!validationResult.success) {
      setStatusMessage({
        text: validationResult.error,
        type: "error"
      });
      return;
    }

    try {
      const response = await fetch("https://api.wiseme.me/api/v1/join-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRef.current.toLowerCase() })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({
          text: "You have joined the waitlist!",
          type: "success"
        });
        emailRef.current = "";
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
      } else {
        // Check both response status and data for email already registered case
        const isEmailRegistered = 
          response.status === 400 || 
          (data && data.message && data.message.toLowerCase().includes('already registered'));

        setStatusMessage({
          text: isEmailRegistered
            ? "Email is already registered"
            : "Something went wrong. Please try again later",
          type: "error"
        });
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
      <h2 className="mb-16 z-10 sm:mb-20 md:text-xl text-center text-lg md:w-[50vw] dark:text-black text-white">
        Join us to get early access, notified as soon as registration opens, priority access to our platform
      </h2>
      {statusMessage.text && (
        <div className={`mb-4 text-center ${statusMessage.type === "success"
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