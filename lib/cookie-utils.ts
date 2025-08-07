// Utility functions to check and debug cookies

export function checkCookies() {
  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  console.log('All current cookies:', cookies);
  
  const authCookies = {
    auth_token: cookies.auth_token,
    csrftoken: cookies.csrftoken,
    sessionid: cookies.sessionid
  };
  
  console.log('Expected auth cookies:', authCookies);
  
  // Check for any cookies that might be auth-related
  const possibleAuthCookies = Object.keys(cookies).filter(key => 
    key.toLowerCase().includes('auth') || 
    key.toLowerCase().includes('token') || 
    key.toLowerCase().includes('session') ||
    key.toLowerCase().includes('csrf')
  );
  
  console.log('Possible auth-related cookies:', possibleAuthCookies);
  
  return authCookies;
}

export function hasAuthCookies(): boolean {
  const cookies = checkCookies();
  return !!(cookies.auth_token && cookies.csrftoken && cookies.sessionid);
}

// Check if any auth-related cookies exist
export function hasAnyAuthCookies(): boolean {
  const allCookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const authRelatedCookies = Object.keys(allCookies).filter(key => 
    key.toLowerCase().includes('auth') || 
    key.toLowerCase().includes('token') || 
    key.toLowerCase().includes('session') ||
    key.toLowerCase().includes('csrf')
  );
  
  console.log('Found auth-related cookies:', authRelatedCookies);
  return authRelatedCookies.length > 0;
}
