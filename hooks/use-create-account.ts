"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient, CreateAccountData, ApiResponse } from '@/lib/api-client';

interface UseCreateAccountReturn {
  createAccount: (data: CreateAccountData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useCreateAccount(): UseCreateAccountReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (data: CreateAccountData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.createAccount(data);
      
      // Check if the response indicates success
      if (response.status === 'success') {
        toast.success(response.message || 'Account created successfully!');
        return true;
      } else {
        // Handle error response
        const errorMessage = response.message || 'Failed to create account';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create account';
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
    createAccount,
    loading,
    error,
    resetError
  };
}
