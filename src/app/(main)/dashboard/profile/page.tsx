"use client"
import { useState } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Profile = () => {
  const [formData, setFormData] = useState({
    avatar: '',
    bio: '',
    github_username: '',
    linkedin_url: '',
    x_handle: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.wiseme.me/profile/create_profile_api_v1_profile_me_create_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setSuccess(true);
      // Show success message or handle success case
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6 bg-[#2C2F33] rounded-lg text-gray-200">
      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {/* Social Media Fields */}
          <div className="space-y-2">
            <label className="text-sm flex items-center gap-2">
              <Twitter className="w-4 h-4" />
              Twitter Handle
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.x_handle}
                onChange={(e) => handleChange('x_handle', e.target.value)}
                className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] pr-10"
                placeholder="@johndoe"
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
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] min-h-[100px] resize-none pr-10"
                placeholder="Tell us about yourself..."
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
            {/* GitHub Username */}
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.github_username}
                  onChange={(e) => handleChange('github_username', e.target.value)}
                  className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] pr-10"
                  placeholder="johndoe"
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

            {/* LinkedIn URL */}
            <div className="space-y-2">
              <label className="text-sm flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.linkedin_url}
                  onChange={(e) => handleChange('linkedin_url', e.target.value)}
                  className="w-full px-3 py-2 bg-[#40464B] rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5865F2] pr-10"
                  placeholder="https://linkedin.com/in/johndoe"
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
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-[#6EC1E4] hover:bg-[#00B8B0] text-white rounded-md w-24 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-500 text-sm mt-2">
              Profile updated successfully!
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="w-32 h-32 rounded-full bg-[#40464B] flex items-center justify-center overflow-hidden">
            {formData.avatar && (
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => handleChange('avatar', e.target.value)}
            className="w-full px-4 py-2 bg-[#40464B] text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
            placeholder="Enter avatar URL"
          />
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
          className="px-4 py-1 bg-gradient-to-r from-[#6EC1E4] to-[#00B8B0] hover:from-[#6EC1E4] hover:to-[#7C3AED] text-white text-sm rounded-md transition-colors"
        >
          Get Nitro
        </button>
      </div>
    </div>
  );
};

export default Profile;