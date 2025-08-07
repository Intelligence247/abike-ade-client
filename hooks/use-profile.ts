"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient, UpdateProfileData, ChangePasswordData, UserProfile, ApiResponse } from '@/lib/api-client';

interface UseProfileReturn {
  getProfile: () => Promise<UserProfile | null>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  changePassword: (data: ChangePasswordData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useProfile(): UseProfileReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async (): Promise<UserProfile | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.getProfile();
      
      if (response.status === 'success') {
        return response.data as UserProfile;
      } else {
        const errorMessage = response.message || 'Failed to fetch profile';
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch profile';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.updateProfile(data);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Profile updated successfully!');
        return true;
      } else {
        const errorMessage = response.message || 'Failed to update profile';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.changePassword(data);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Password changed successfully!');
        return true;
      } else {
        const errorMessage = response.message || 'Failed to change password';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to change password';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  return {
    getProfile,
    updateProfile,
    changePassword,
    loading,
    error,
    resetError
  };
}
