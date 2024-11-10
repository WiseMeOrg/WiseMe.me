"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@clerk/clerk-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Pencil, X } from 'lucide-react';

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
            <div className="min-h-screen bg-[#2c2f33] text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2c2f33] text-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <div className="relative">
                                        <Input
                                            name="name"
                                            type="text"
                                            className="w-full bg-[#40444b] border-none text-white pl-3 pr-10"
                                            value={formData.name}
                                            placeholder='Your Name'
                                            onChange={handleInputChange}
                                        />
                                        <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* Bio Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                    <div className="relative">
                                        <Textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#40444b] border-none text-white resize-none h-24"
                                            placeholder="Tell us about yourself"
                                        />
                                        <Pencil className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
                                    </div>
                                </div>

                                {/* X Handle Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">X Handle</label>
                                    <div className="relative">
                                        <Input
                                            name="x_handle"
                                            value={formData.x_handle}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#40444b] border-none text-white pl-3 pr-10"
                                            placeholder="@username"
                                        />
                                        <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* LinkedIn Handle Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">LinkedIn Handle</label>
                                    <div className="relative">
                                        <Input
                                            name="linkedin_url"
                                            value={formData.linkedin_url}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#40444b] border-none text-white pl-3 pr-10"
                                            placeholder="LinkedIn URL"
                                        />
                                        <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                {/* Github Handle Field */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Github Handle</label>
                                    <div className="relative">
                                        <Input
                                            name="github_username"
                                            value={formData.github_username}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#40444b] border-none text-white pl-3 pr-10"
                                            placeholder="Github username"
                                        />
                                        <Pencil className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
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

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-24 bg-[#7289da] hover:bg-[#677bc4] text-white"
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </Button>
                        </form>
                    </div>

                    <div className="ml-8 text-center">
                        <div className="w-32 h-32 rounded-full bg-[#40444b] overflow-hidden mb-4">
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
                        
                        {isEditingAvatar ? (
                            <div className="flex items-center">
                                <Input
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleInputChange}
                                    placeholder="Image URL"
                                    className="w-full bg-[#40444b] border-none text-white pl-3 pr-10"
                                />
                                <X className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" onClick={() => setIsEditingAvatar(false)} />
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditingAvatar(true)} className="bg-[#7289da] hover:bg-[#677bc4] text-white">
                                Change Avatar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditPage;
