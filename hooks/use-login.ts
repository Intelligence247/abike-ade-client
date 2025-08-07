"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient, LoginData, ApiResponse } from '@/lib/api-client';
import { checkCookies, hasAuthCookies, hasAnyAuthCookies } from '@/lib/cookie-utils';

interface UseLoginReturn {
  login: (data: LoginData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  resetError: () => void;
}

export function useLogin(): UseLoginReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse = await apiClient.login(data);
      
      if (response.status === 'success') {
        toast.success(response.message || 'Login successful!');
        
        // Check if cookies were set after login
        console.log('Checking cookies after login...');
        setTimeout(() => {
          const hasAnyCookies = hasAnyAuthCookies();
          const hasSpecificCookies = hasAuthCookies();
          console.log('Has any auth-related cookies after login:', hasAnyCookies);
          console.log('Has specific auth cookies after login:', hasSpecificCookies);
          
          if (hasAnyCookies || hasSpecificCookies) {
            console.log('Cookies found, redirecting to dashboard...');
            window.location.href = '/dashboard';
          } else {
            console.log('No auth cookies found after login - this might indicate a backend issue');
            // Still redirect but log the issue
            window.location.href = '/dashboard';
          }
        }, 1000);
        
        return true;
      } else {
        const errorMessage = response.message || 'Login failed';
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
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
    login,
    loading,
    error,
    resetError
  };
}
