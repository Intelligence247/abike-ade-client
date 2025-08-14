"use client"

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { apiClient, UpdateProfileData, ChangePasswordData, UserProfile, ApiResponse } from '@/lib/api-client';

interface UseProfileReturn {
  profile: UserProfile | null;
  getProfile: () => Promise<UserProfile | null>;
  updateProfile: (data: UpdateProfileData) => Promise<boolean>;
  changePassword: (data: ChangePasswordData) => Promise<boolean>;
  uploadIdentity: (formData: FormData) => Promise<boolean>;
  uploadAgreement: (formData: FormData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProfile = async (): Promise<UserProfile | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('useProfile: Fetching profile...');
      const response: ApiResponse = await apiClient.getProfile();
      console.log('useProfile: Profile API response:', response);
      
      if (response.status === 'success') {
        const profileData = response.data as UserProfile;
        console.log('useProfile: Profile data received:', profileData);
        setProfile(profileData);
        return profileData;
      } else {
        const errorMessage = response.message || 'Failed to fetch profile';
        console.error('useProfile: Profile API error:', errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
        return null;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch profile';
      console.error('useProfile: Profile fetch error:', err);
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
        // Update the local profile state with new data
        if (profile) {
          setProfile({ ...profile, ...data });
        }
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

  const uploadIdentity = async (formData: FormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.uploadIdentity(formData);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Identity document uploaded successfully!');
        return true;
      } else {
        const errorMessage = response.message || 'Failed to upload identity document';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to upload identity document';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const uploadAgreement = async (formData: FormData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.uploadAgreement(formData);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Agreement uploaded successfully!');
        return true;
      } else {
        const errorMessage = response.message || 'Failed to upload agreement';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to upload agreement';
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

  // Fetch profile on mount
  useEffect(() => {
    console.log('useProfile: Component mounted, fetching profile...');
    getProfile();
  }, []);

  return {
    profile,
    getProfile,
    updateProfile,
    changePassword,
    uploadIdentity,
    uploadAgreement,
    loading,
    error,
    resetError
  };
}
