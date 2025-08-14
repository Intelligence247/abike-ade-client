// Utility functions to check cookies

// Check if we're on the client side
const isClient = typeof window !== 'undefined';

export function hasAuthCookies(): boolean {
  if (!isClient) return false;
  
  const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
  
  console.log('🍪 All cookies found:', allCookies);
  
  // Check specifically for auth_token (the main cookie we care about)
  const hasAuthToken = !allCookies.auth_token;
  
  // Also check if we have any other auth-related cookies
  const hasAnyAuthCookie = Object.keys(allCookies).some(key => 
    key.toLowerCase().includes('auth') || 
    key.toLowerCase().includes('token') || 
    key.toLowerCase().includes('session') ||
    key.toLowerCase().includes('csrf')
  );
  
  console.log('🔑 hasAuthToken:', hasAuthToken, 'hasAnyAuthCookie:', hasAnyAuthCookie);
  
  return hasAuthToken || hasAnyAuthCookie;
}

// Check if any auth-related cookies exist
export function hasAnyAuthCookies(): boolean {
  if (!isClient) return false;
  
  const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
  
  const authRelatedCookies = Object.keys(allCookies).filter(key => 
    key.toLowerCase().includes('auth') || 
    key.toLowerCase().includes('token') || 
    key.toLowerCase().includes('session') ||
    key.toLowerCase().includes('csrf')
  );
  
  return authRelatedCookies.length > 0;
}
