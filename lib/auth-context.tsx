"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, ApiResponse } from '@/lib/api-client';
import { checkCookies, hasAuthCookies, hasAnyAuthCookies } from '@/lib/cookie-utils';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      console.log('Checking authentication status...');
      
      // First check if we have any auth-related cookies
      const hasAnyCookies = hasAnyAuthCookies();
      console.log('Has any auth-related cookies:', hasAnyCookies);
      
      // Also check for the specific expected cookies
      const hasSpecificCookies = hasAuthCookies();
      console.log('Has specific auth cookies:', hasSpecificCookies);
      
      // If we have any auth-related cookies, try the API call
      if (hasAnyCookies || hasSpecificCookies) {
        console.log('Found some auth cookies, checking with API...');
        const response: ApiResponse = await apiClient.loginStatus();
        console.log('Login status response:', response);
        
        if (response.status === 'success' && response.authenticated) {
          console.log('User is authenticated');
          setIsAuthenticated(true);
        } else {
          console.log('User is not authenticated according to API');
          setIsAuthenticated(false);
        }
      } else {
        console.log('No auth cookies found, user is not authenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Clear any stored auth data if needed
    router.push('/signin');
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      checkAuthStatus,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
