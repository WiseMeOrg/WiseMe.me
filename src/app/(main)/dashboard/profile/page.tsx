<<<<<<< HEAD
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
=======
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@clerk/clerk-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pencil, X } from 'lucide-react';
import { motion } from 'framer-motion';


const ProfileEditPage = () => {
  const { getToken, isLoaded } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    avatar: '',
    bio: '',
    x_handle: '',
    linkedin_url: '',
    github_username: '',
  });

  // Fetch existing profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const response = await fetch('https://api.wiseme.me/api/v1/profile/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            avatar: data.avatar || '',
            bio: data.bio || '',
            x_handle: data.x_handle || '',
            linkedin_url: data.linkedin_url || '',
            github_username: data.github_username || '',
          });
        } else if (response.status === 404) {
          // Profile does not exist, continue with empty formData
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setIsFetching(false);
      }
    };

    if (isLoaded) {
      fetchProfile();
    }
  }, [isLoaded, getToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createNewProfile = async (token) => {
    const createResponse = await fetch('https://api.wiseme.me/api/v1/profile/me/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!createResponse.ok) {
      throw new Error('Failed to create profile');
    }

    return await createResponse.json();
  };

  const updateProfile = async (token) => {
    const updateResponse = await fetch('https://api.wiseme.me/api/v1/profile/me/update', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const responseBody = await updateResponse.json();
    console.log('Response from server:', responseBody);

    if (!updateResponse.ok) {
      throw new Error(responseBody.message || 'Failed to update profile');
    }

    return responseBody;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = await getToken();

      try {
        await updateProfile(token);
        setSuccess('Profile updated successfully!');
      } catch (updateError) {
        if (updateError.message.includes('404')) {
          try {
            await createNewProfile(token);
            setSuccess('Profile created successfully!');
          } catch (createError) {
            throw new Error('Failed to create or update profile');
          }
        } else {
          throw updateError;
        }
      }

      setIsEditingAvatar(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (


    <div className="min-h-screen  text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-8 gap-8">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <div className="relative">
                      <Input
                        name="name"
                        type="text"
                        className="w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10 placeholder:text-gray-400"
                        value={formData.name}
                        placeholder='Your Name'
                        onChange={handleInputChange}

                      />
                      <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </motion.div>

                {/* Bio Field */}
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <div className="relative">
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white resize-none h-24  placeholder:text-gray-400"
                        placeholder="Tell us about yourself"
                      />
                      <Pencil className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                </motion.div>

                {/* X Handle Field */}
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">X Handle</label>
                    <div className="relative">
                      <Input
                        name="x_handle"
                        value={formData.x_handle}
                        onChange={handleInputChange}
                        className="w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10  placeholder:text-gray-400"
                        placeholder="@username"
                      />
                      <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </motion.div>

                {/* LinkedIn Handle Field */}
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn Handle</label>
                    <div className="relative">
                      <Input
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleInputChange}
                        className="w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10  placeholder:text-gray-400"
                        placeholder="LinkedIn URL"
                      />
                      <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </motion.div>

                {/* Github Handle Field */}
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">Github Handle</label>
                    <div className="relative">
                      <Input
                        name="github_username"
                        value={formData.github_username}
                        onChange={handleInputChange}
                        className="w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10  placeholder:text-gray-400"
                        placeholder="Github username"
                      />
                      <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-500 text-white">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.9, ease: [0.4, 0.0, 0.2, 1], }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-24 bg-[#6EC1E4] bg-opacity-70 hover:bg-[#417890] text-white"
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </motion.div>
            </form>
          </div>

          <div className="ml-8 text-center">
          <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }}
                >
            <div className="w-32 h-32 rounded-full bg-[#6EC1E4] bg-opacity-20 overflow-hidden mb-4">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-[#87CEEB] to-[#90EE90]" />
              )}
            </div>
            </motion.div>

            {isEditingAvatar ? (
              <div className="flex items-center">
                <Input
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                  className="w-[8rem] bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10"
                />
                <X className="w-4 h-4 mr-[-3rem] ml-2 text-gray-400 cursor-pointer" onClick={() => setIsEditingAvatar(false)} />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }}
              >
              <Button onClick={() => setIsEditingAvatar(true)} className="bg-[#6EC1E4] bg-opacity-70 hover:bg-[#417890] text-white">
                Change Avatar
              </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProfileEditPage;
>>>>>>> 35d79cf (styling)
