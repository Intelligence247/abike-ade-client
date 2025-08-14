"use client"

import { useState } from 'react';
import { toast } from 'sonner';

interface UseOTPReturn {
  requestOTP: (email: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useOTP(): UseOTPReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestOTP = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Dynamically import the API client to avoid SSR issues
      const { apiClient } = await import('@/lib/api-client');
      const response = await apiClient.requestOTP({ email });
      
      // Check if the response indicates success
      if (response.status === 'success') {
        toast.success(response.message || 'OTP sent successfully!');
        return true;
      } else {
        // Handle error response
        const errorMessage = response.message || 'Failed to send OTP';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send OTP';
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
    requestOTP,
    loading,
    error,
    resetError
  };
}
