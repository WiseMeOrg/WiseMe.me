"use client"
import { useState } from 'react';

const Profile = () => {
  const [bio, setBio] = useState<string>('');
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6 bg-[#2C2F33] rounded-lg text-gray-200">
      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label className="text-sm">Twitter Handle</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] pr-10"
                placeholder="Enter handle"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Bio</label>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px] resize-none pr-10"
                placeholder="Enter bio"
              />
              <button
                type="button"
                className="absolute right-2 top-4 text-gray-400 hover:text-gray-200 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm flex items-center gap-2">
                  Twitter Handle
                  <span className="text-[#5865F2]">✓</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] pr-10"
                    placeholder="Enter handle"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="px-6 py-2 bg-[#6EC1E4] hover:bg-[#00B8B0] text-white rounded-md w-24 transition-colors"
          >
            Save
          </button>
        </div>

        <div className="space-y-4">
          <div className="w-32 h-32 rounded-full bg-[#40464B] flex items-center justify-center overflow-hidden">
           {/* profile image */}
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 bg-[#6EC1E4] hover:bg-[#00B8B0] text-white rounded-md transition-colors"
          >
            Edit Avatar
          </button>
        </div>
      </div>

      <div className="mt-8 p-3 bg-[#1E2124] rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#5865F2]">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="text-sm">Level up your look, only with</span>
          <span className="text-[#5865F2] font-semibold">Nitro</span>
        </div>
        <button
          type="button"
          className="px-4 py-1 bg-gradient-to-r  from-[#6EC1E4] to-[#00B8B0] hover:from-[#6EC1E4] hover:to-[#7C3AED] text-white text-sm rounded-md transition-colors"
        >
          Get Nitro
        </button>
      </div>
    </div>
  );
};

export default Profile;