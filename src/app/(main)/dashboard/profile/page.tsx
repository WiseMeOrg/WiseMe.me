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
        console.log("Error:", err);
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
              </div>
            </div>
          </div>
        </div >


      )}
    </>
  );
};

export default ProfileEditPage;