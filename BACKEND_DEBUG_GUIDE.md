# Backend Cookie Debug Guide

## Issue Summary
The frontend login is successful, but the backend is **not setting the `auth_token` cookie** properly. This causes users to be redirected back to login after successful authentication.

## Current Backend Code (from your image)
```python
response.set_cookie(
    key='auth_token',
    value=token.key,
    httponly=True,
    #secure=not settings.DEBUG,  # This is commented out
    #samesite='Lax',            # This is commented out
    max_age=60 * 60 * 24 * 7,
    path='/'
)
```

## Problems Identified

### 1. **Missing Domain Setting**
The cookie is not being set with the correct domain for cross-origin requests.

### 2. **CORS Configuration Issues**
The frontend (localhost:5173) and backend might have CORS configuration problems.

### 3. **Cookie Attributes**
Some cookie attributes might be preventing the cookie from being set properly.

## Required Backend Fixes

### Fix 1: Update Cookie Settings
```python
response.set_cookie(
    key='auth_token',
    value=token.key,
    httponly=True,
    secure=False,  # Set to False for HTTP development
    samesite='Lax',  # Uncomment and set to 'Lax'
    max_age=60 * 60 * 24 * 7,
    path='/',
    domain=None  # Let browser set the domain automatically
)
```

### Fix 2: CORS Configuration
Make sure your Django CORS settings include:

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

# Additional CORS settings
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_EXPOSE_HEADERS = [
    'set-cookie',
]
```

### Fix 3: Response Headers
Make sure your login response includes proper headers:

```python
# In your login view
response = JsonResponse({
    'status': 'success',
    'message': 'Login successful',
    'data': user_data
})

# Set CORS headers explicitly
response["Access-Control-Allow-Credentials"] = "true"
response["Access-Control-Allow-Origin"] = "http://localhost:5173"

# Set the cookie
response.set_cookie(
    key='auth_token',
    value=token.key,
    httponly=True,
    secure=False,
    samesite='Lax',
    max_age=60 * 60 * 24 * 7,
    path='/',
    domain=None
)

return response
```

## Testing Steps for Backend Developer

### Step 1: Test Cookie Setting
1. Make a login request from the frontend
2. Check the response headers in the Network tab
3. Look for `Set-Cookie` header in the response
4. Verify the cookie is being set with correct attributes

### Step 2: Check CORS
1. Ensure the login request includes `credentials: 'include'`
2. Check that the response has proper CORS headers
3. Verify no CORS errors in browser console

### Step 3: Test Cookie Reception
1. After login, check if the cookie appears in browser
2. Verify the cookie domain and path are correct
3. Test that subsequent requests include the cookie

## Expected Behavior After Fix

1. **Login Request**: Should return 200 with `Set-Cookie` header
2. **Cookie Setting**: `auth_token` should appear in browser cookies
3. **Dashboard Access**: User should stay logged in and access dashboard
4. **API Calls**: Subsequent API calls should include the `auth_token` cookie

## Debug Information to Share

When testing, please share:
1. The complete response headers from the login request
2. Any CORS errors in the browser console
3. The actual cookie that gets set (if any)
4. The backend logs during login

## Common Issues and Solutions

### Issue 1: Cookie Not Setting
**Cause**: Domain mismatch or CORS issues
**Solution**: Set `domain=None` and ensure CORS is configured

### Issue 2: Cookie Setting But Not Accessible
**Cause**: Wrong path or domain
**Solution**: Use `path='/'` and `domain=None`

### Issue 3: CORS Errors
**Cause**: Missing CORS configuration
**Solution**: Add proper CORS settings and headers

## Frontend Information

- **Frontend URL**: `http://localhost:5173`
- **Expected Cookie**: `auth_token`
- **Cookie Attributes**: `httponly=True`, `secure=False`, `samesite='Lax'`
- **Path**: `/`
- **Domain**: Should be automatically set by browser

## Next Steps

1. **Apply the fixes above** to your backend code
2. **Test the login flow** with the updated code
3. **Check browser Network tab** for proper cookie setting
4. **Verify dashboard access** works after login
5. **Share results** with the frontend developer
