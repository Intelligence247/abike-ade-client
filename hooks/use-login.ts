"use client"

import { useState } from 'react';
import { toast } from 'sonner';
import { hasAuthCookies } from '@/lib/cookie-utils';

interface LoginData {
  username: string;
  password: string;
}

interface ApiResponse {
  message: string;
  status: 'success' | 'error';
  data?: any;
  authenticated?: boolean;
}

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
      
      console.log('🚀 Starting login process...');
      
      // Dynamically import the API client to avoid SSR issues
      const { apiClient } = await import('@/lib/api-client');
      const response: ApiResponse = await apiClient.login(data);
      
      console.log('📨 Login response received:', response);
      
      if (response.status === 'success') {
        console.log('✅ Login successful, checking cookies...');
        
        // Check cookies after successful login
        const { hasAuthCookies } = await import('@/lib/cookie-utils');
        const hasCookies = hasAuthCookies();
        console.log('🍪 Has auth cookies after login:', hasCookies);
        
        toast.success(response.message || 'Login successful!');
        
        // Simple redirect to dashboard after successful login
        console.log('🔄 Redirecting to dashboard...');
        window.location.href = '/dashboard';
        return true;
      } else {
        const errorMessage = response.message || 'Login failed';
        console.log('❌ Login failed:', errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
        return false;
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      console.log('💥 Login error:', errorMessage);
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
