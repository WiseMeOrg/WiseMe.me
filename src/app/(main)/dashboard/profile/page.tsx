<<<<<<< HEAD
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
=======
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@clerk/nextjs';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Divide, Pencil, X } from 'lucide-react';
import { motion } from 'framer-motion';
import * as z from 'zod';

// Zod validation schema
const profileSchema = z.object({
  name: z.string().min(1, "Name is required").or(z.literal('')),
  avatar: z.string()
  .regex(/^https:\/\//, "Invalid URL").url("Avatar must be a valid URL").or(z.literal('')),
  bio: z.string().min(1, "Bio is required"),
  x_handle: z.string()
    .regex(/^@/, "Twitter handle must start with @")
    .or(z.literal('')),
  linkedin_url: z.string()
    .regex(/^https:\/\//, "Invalid URL")
    .url("Must be a valid URL")
    .or(z.literal('')),
  github_username: z.string().or(z.literal(''))

});

type FormData = z.infer<typeof profileSchema>;

interface ValidationError {
  field: string;
  message: string;
}

const ProfileEditPage = () => {
  const { getToken, isLoaded } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [existence, setExistence] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);


  const [formData, setFormData] = useState<FormData>({
    name: '',
    avatar: '',
    bio: '',
    x_handle: '',
    linkedin_url: '',
    github_username: '',
  });

  // Fetch existing profile data
  useEffect(() => {
    const checkProfileExists = async () => {
      try {
        const token = await getToken();
        console.log("Token:", token);
        const response = await fetch('https://api.wiseme.me/api/v1/profile/me/status', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        const ans = await response.json();
        const stat = await ans.is_exits;

        console.log(ans);
        console.log(stat);

        if (stat) {
          console.log("User Exists");
          fetchProfile();
          setExistence(true);

        } else if (!stat) {
          console.log("User does not Exist");

          setExistence(false);

          // createNewProfile();


        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setIsFetching(false);
      }
    }

    if (isLoaded) {
      checkProfileExists();
      // fetchProfile();
    }
  }, [isLoaded, getToken]);

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
        console.log(data);
        setFormData({
          name: data.name,
          avatar: data.profile.avatar || '',
          bio: data.profile.bio || '',
          x_handle: data.profile.x_handle || '',
          linkedin_url: data.profile.linkedin_url || '',
          github_username: data.profile.github_username || '',
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

  const validateForm = (): boolean => {
    try {
      profileSchema.parse(formData);
      setValidationErrors([]);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: ValidationError[] = err.errors.map(error => ({
          field: error.path[0] as string,
          message: error.message
        }));
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createNewProfile = async (token: string | null) => {

    if (!validateForm()) {
      throw new Error('Please fix the validation errors');
    }

    const updateResponse = await fetch('https://api.wiseme.me/api/v1/profile/me/create', {
      method: 'POST',
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
      throw new Error(responseBody.message || 'Failed to create profile');
    }

    return responseBody;
  };

  const updateProfile = async (token: string | null) => {

    if (!validateForm()) {
      throw new Error('Please fix the validation errors');
    }

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

  const getFieldError = (fieldName: string): string => {
    const error = validationErrors.find(err => err.field === fieldName);
    return error ? error.message : '';
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        if ((updateError as Error).message.includes('404')) {
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
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };



  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const token = await getToken();

    try {

      try {
        await createNewProfile(token);
        setSuccess('Profile created successfully!');
      } catch (err) {
        console.log("Error:",err);
        throw new Error('Failed to create profile');
      }

      setIsEditingAvatar(false);
    } catch (err) {
      setError((err as Error).message);
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

  const renderField = (
    name: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string,
    Component: typeof Input | typeof Textarea = Input
  ) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [10, -5, 0] }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div>
        <label className="block text-sm font-medium mb-2">{label}</label>
        <div className="relative">
          <Component
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className={`w-full bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10 placeholder:text-gray-400 ${getFieldError(name) ? 'border-red-500' : ''
              }`}
            placeholder={placeholder}
          />
          <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {getFieldError(name) && (
          <p className="text-red-500 text-sm mt-1">{getFieldError(name)}</p>
        )}
      </div>
    </motion.div>
  );


  return (
    <>
      {existence ? (<div className="min-h-screen overflow-y-scroll  text-white p-8">
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
                          required
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
                          required
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

                {getFieldError("github_username") && (
                  <p className="text-red-500 text-sm mt-1">{getFieldError("github_username")}</p>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border bg-transparent border-green-500 text-green-500">
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
              {getFieldError("avatar") && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError("avatar")}</p>
                  )}

              {isEditingAvatar ? (
                <div className="flex items-center">

                  {getFieldError("avatar") && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError("avatar")}</p>
                  )}

                  <Input
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="w-[8rem] bg-[#6EC1E4] bg-opacity-20 border-none text-white pl-3 pr-10"
                  />
                  <X className="w-4 h-4 mr-[-3rem] ml-2 text-gray-400 cursor-pointer" onClick={() => setIsEditingAvatar(false)} />
                  {getFieldError("avatar") && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError("avatar")}</p>
                  )}
                </div>



              ) : (
                <motion.div initial={{ opacity: 0, y: 10, }} animate={{ opacity: 1, y: [10, -5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }}
                >
                  <Button onClick={() => setIsEditingAvatar(true)} className="bg-[#6EC1E4] bg-opacity-70 hover:bg-[#417890] text-white">
                    Change Avatar
                  </Button>
                </motion.div>
              )}

              {getFieldError("avatar") && (
                <p className="text-red-500 text-sm mt-1">{getFieldError("avatar")}</p>
              )}
            </div>



          </div>

        </div>
      </div >) : (

        <div className="min-h-screen overflow-y-scroll text-white p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-start mb-8 gap-8">
              <div className="flex-1">
                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-4">

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
                            required
                          />
                          <Pencil className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>

                    {getFieldError("bio") && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError("bio")}</p>
                    )}

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

                    {getFieldError("x_handle") && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError("x_handle")}</p>
                    )}

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

                    {getFieldError("linkedin_url") && (
                      <p className="text-red-500 text-sm mt-1">{getFieldError("linkedin_url")}</p>
                    )}

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

                  {getFieldError("github_username") && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError("github_username")}</p>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-transparent text-green-500">
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
                      {isLoading ? "Creating..." : "Create"}
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
                <div className='max-w-lg text-center'>
                {getFieldError("avatar") && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError("avatar")}</p>
                  )}
                </div>
                

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
>>>>>>> 771d44ea2a59207c8bee2d953e1ec46e518fcf5c
              </div>
            </div>
          </div>
        </div >

<<<<<<< HEAD
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
=======

      )}
    </>
>>>>>>> 771d44ea2a59207c8bee2d953e1ec46e518fcf5c
  );
};

export default ProfileEditPage;