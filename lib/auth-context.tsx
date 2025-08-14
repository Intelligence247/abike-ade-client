"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { cookieUtils } from '@/lib/utils';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuthStatus: () => Promise<void>;
  logout: () => void;
  clearAllCookies: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 Checking authentication status via SDK...');
      
      // Use the SDK's loginStatus endpoint
      const response = await apiClient.checkLoginStatus();
      
      console.log('🔍 SDK loginStatus response:', response);
      
      if (response.status === 'success') {
        const authenticated = response.authenticated === true;
        console.log('✅ Authentication status:', authenticated);
        setIsAuthenticated(authenticated);
        
        // If not authenticated and on a protected route, redirect to login
        if (!authenticated) {
          const currentPath = window.location.pathname;
          const protectedRoutes = ['/dashboard', '/transactions', '/agreements', '/profile'];
          const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));
          
          if (isProtectedRoute) {
            console.log('🚫 User not authenticated on protected route, redirecting to login');
            router.push('/signin');
          }
        }
      } else {
        console.log('❌ SDK loginStatus failed:', response.message);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('⚠️ Error checking authentication status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint via SDK
      console.log('🚪 Calling logout API...');
      const response = await apiClient.logout();
      console.log('🚪 Logout API response:', response);
      
      // Handle different response structures
      let message = 'Logged out successfully';
      if (response && typeof response === 'object') {
        const responseObj = response as any; // Type assertion for dynamic response
        if (responseObj.message) {
          message = responseObj.message;
        } else if (responseObj.status === 'success') {
          message = responseObj.message || 'Logged out successfully';
        }
      }
      
      toast.success(message);
      console.log('🚪 User logged out via API');
      
      // Clear all cookies and storage before redirecting
      cookieUtils.clearAllCookies();
      
      // Small delay to show toast before redirecting
      setTimeout(() => {
        // Clear local state and redirect
        setIsAuthenticated(false);
        console.log('🚪 User logged out');
        router.push('/signin');
      }, 1000);
    } catch (error) {
      console.error('⚠️ Error during logout:', error);
      toast.error('Failed to log out');
      // Continue with logout even if API call fails
      cookieUtils.clearAllCookies();
      setTimeout(() => {
        setIsAuthenticated(false);
        console.log('🚪 User logged out');
        router.push('/signin');
      }, 1000);
    }
  };

  // Check auth status on mount and set up periodic checks
  useEffect(() => {
    checkAuthStatus();
    
    // Set up periodic auth checks every 5 minutes
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      checkAuthStatus,
      logout,
      clearAllCookies: cookieUtils.clearAllCookies
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
