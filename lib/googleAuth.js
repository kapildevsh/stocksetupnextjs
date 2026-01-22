// ========================================
// GOOGLE OAUTH INTEGRATION
// ========================================
// This file handles Google Sign-In integration
// Triggers Google OAuth dialog directly without auth page

const FASTAPI_URL = 'https://localhost:8000'

// Initialize Google OAuth
export const initGoogleAuth = () => {
  if (typeof window === 'undefined') return
  
  // Load Google Identity Services library
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
}

// Trigger Google Sign-In
export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'))
      return
    }

    // Check if Google library is loaded
    if (!window.google) {
      reject(new Error('Google Sign-In library not loaded'))
      return
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: 'email profile openid',
      callback: (response) => {
        if (response.access_token) {
          resolve(response.access_token)
        } else {
          reject(new Error('No access token received'))
        }
      },
      error_callback: (error) => {
        reject(error)
      },
    })

    client.requestAccessToken()
  })
}

// Alternative: Using popup method
export const signInWithGooglePopup = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'))
      return
    }

    if (!window.google) {
      reject(new Error('Google Sign-In library not loaded'))
      return
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response.credential) {
          resolve(response.credential)
        } else {
          reject(new Error('No credential received'))
        }
      },
    })

    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback to manual trigger
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large' }
        )
      }
    })
  })
}

// Send Google token to FastAPI backend
export const authenticateWithBackend = async (googleToken) => {
  try {
    const response = await fetch(`${FASTAPI_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: googleToken,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Authentication failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Backend authentication error:', error)
    throw error
  }
}

// Complete login flow
export const handleGoogleLogin = async () => {
  try {
    // Step 1: Trigger Google OAuth
    const googleToken = await signInWithGoogle()
    
    // Step 2: Send token to FastAPI backend
    const backendResponse = await authenticateWithBackend(googleToken)
    
    // Step 3: Store JWT token and user data
    if (backendResponse.access_token) {
      localStorage.setItem('jwt_token', backendResponse.access_token)
      localStorage.setItem('user_data', JSON.stringify(backendResponse.user))
      localStorage.setItem('user_type', backendResponse.user.role || 'user')
    }
    
    return backendResponse
  } catch (error) {
    console.error('Google login error:', error)
    throw error
  }
}

// Get JWT token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token')
  }
  return null
}

// Remove auth data (logout)
export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_type')
    localStorage.removeItem('user_data')
  }
}