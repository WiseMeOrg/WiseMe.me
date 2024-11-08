"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo() {
  const placeholders = [
    "Learn the wise way! Email.",
    "Enter your email"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
    try {
      const response = await fetch("https://wiseme.me/api/v1/join-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Submission successful:", data);
      } else {
        console.error("Error submitting:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="h-[45rem] mt-[-31rem] md:mt-[-29rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-16 z-10 sm:mb-20 md:text-xl text-center text-lg  md:w-[50vw] dark:text-white text-white">
      Join us to get early access, notified as soon as registration opens, priority access to our platform      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
