"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient, ForgotPasswordData, ApiResponse } from '@/lib/api-client';

interface UseForgotPasswordReturn {
  forgotPassword: (data: ForgotPasswordData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useForgotPassword(): UseForgotPasswordReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async (data: ForgotPasswordData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.forgotPassword(data);
      
      // Check if the response indicates success
      if (response.status === 'success') {
        toast.success(response.message || 'Password reset instructions sent to your email!');
        return true;
      } else {
        // Handle error response
        const errorMessage = response.message || 'Failed to send password reset email';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to send password reset email';
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
    forgotPassword,
    loading,
    error,
    resetError
  };
}
