import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely constructs an image URL by combining base URL and image path
 * @param baseUrl - The base URL from environment variables
 * @param imagePath - The image path from the API response
 * @param fallbackUrl - Optional fallback URL if construction fails
 * @returns A valid image URL or fallback
 */
export function constructImageUrl(
  baseUrl: string | undefined, 
  imagePath: string | undefined, 
  fallbackUrl: string = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image'
): string {
  if (!baseUrl || !imagePath) {
    return fallbackUrl;
  }
  
  try {
    // Ensure the base URL ends with a slash and image path doesn't start with one
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullUrl = `${cleanBaseUrl}${cleanImagePath}`;
    
    // Validate the URL
    new URL(fullUrl);
    return fullUrl;
  } catch (error) {
    console.warn('Invalid image URL constructed:', { baseUrl, imagePath, error });
    return fallbackUrl;
  }
}

// Cookie utility functions
export const cookieUtils = {
  // Clear all cookies for the current domain
  clearAllCookies: () => {
    try {
      if (typeof window === 'undefined') return;
      
      console.log('🧹 Clearing all cookies...');
      
      // Method 1: Clear by setting expiration
      document.cookie.split(";").forEach(function(c) { 
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        
        // Clear with different path and domain combinations
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      });
      
      // Method 2: Clear localStorage and sessionStorage
      localStorage.clear();
      sessionStorage.clear();
      
      console.log('🧹 All cookies and storage cleared successfully');
    } catch (error) {
      console.error('⚠️ Error clearing cookies:', error);
    }
  },

  // Clear a specific cookie
  clearCookie: (name: string) => {
    try {
      if (typeof window === 'undefined') return;
      
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      
      console.log(`🧹 Cookie '${name}' cleared successfully`);
    } catch (error) {
      console.error(`⚠️ Error clearing cookie '${name}':`, error);
    }
  },

  // Get all cookie names
  getCookieNames: (): string[] => {
    try {
      if (typeof window === 'undefined') return [];
      
      return document.cookie.split(";").map(cookie => {
        const eqPos = cookie.indexOf("=");
        return eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      });
    } catch (error) {
      console.error('⚠️ Error getting cookie names:', error);
      return [];
    }
  },

  // Check if a cookie exists
  hasCookie: (name: string): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      
      return document.cookie.split(';').some(cookie => 
        cookie.trim().startsWith(`${name}=`)
      );
    } catch (error) {
      console.error(`⚠️ Error checking cookie '${name}':`, error);
      return false;
    }
  }
};
