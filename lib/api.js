// ========================================
// API HELPER FUNCTIONS FOR FASTAPI BACKEND
// ========================================
// This file contains helper functions to interact with FastAPI backend
// All API calls will use JWT tokens stored in localStorage

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Get JWT token from localStorage
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwt_token')
  }
  return null
}

// Set JWT token in localStorage
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt_token', token)
  }
}

// Remove JWT token from localStorage (logout)
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_type')
    localStorage.removeItem('user_data')
  }
}

// Get user data from localStorage
export const getUserData = () => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  }
  return null
}

// API call wrapper with JWT token
export const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Add JWT token to headers if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      removeAuthToken()
      if (typeof window !== 'undefined') {
        window.location.href = '/auth'
      }
      throw new Error('Unauthorized - Please login again')
    }

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

// ========================================
// AUTHENTICATION APIs
// ========================================

// Google OAuth Login
export const googleLogin = async (googleToken, userType) => {
  return apiCall('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      token: googleToken,
      user_type: userType,
    }),
  })
}

// Logout
export const logout = async () => {
  try {
    await apiCall('/api/auth/logout', {
      method: 'POST',
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    removeAuthToken()
  }
}

// Verify token
export const verifyToken = async () => {
  return apiCall('/api/auth/verify', {
    method: 'GET',
  })
}

// ========================================
// STOCK DATA APIs
// ========================================

// Get stock market overview
export const getStockOverview = async () => {
  return apiCall('/api/stocks/overview', {
    method: 'GET',
  })
}

// Get index movers data
export const getIndexMovers = async () => {
  return apiCall('/api/stocks/index-movers', {
    method: 'GET',
  })
}

// Get option chain data
export const getOptionData = async (symbol) => {
  return apiCall(`/api/stocks/option-data?symbol=${symbol}`, {
    method: 'GET',
  })
}

// Get futures data
export const getFutureData = async () => {
  return apiCall('/api/stocks/future-data', {
    method: 'GET',
  })
}

// Get swing trade setups
export const getSwingTrades = async () => {
  return apiCall('/api/stocks/swing-trades', {
    method: 'GET',
  })
}

// Get intraday opportunities
export const getIntradayTrades = async () => {
  return apiCall('/api/stocks/intraday', {
    method: 'GET',
  })
}

// Get option trading strategies
export const getOptionTrades = async () => {
  return apiCall('/api/stocks/option-trades', {
    method: 'GET',
  })
}

// Get technical setups
export const getTechnicalSetups = async () => {
  return apiCall('/api/stocks/setups', {
    method: 'GET',
  })
}

// Get FII/DII data
export const getFIIDIIData = async () => {
  return apiCall('/api/stocks/fii-dii', {
    method: 'GET',
  })
}

// ========================================
// USAGE EXAMPLE
// ========================================
/*
import { googleLogin, setAuthToken, getStockOverview } from '@/lib/api'

// In your component:
const handleLogin = async (googleToken) => {
  try {
    const response = await googleLogin(googleToken, 'user')
    setAuthToken(response.access_token)
    localStorage.setItem('user_data', JSON.stringify(response.user))
    router.push('/users')
  } catch (error) {
    console.error('Login failed:', error)
  }
}

// Fetch stock data:
const fetchStocks = async () => {
  try {
    const data = await getStockOverview()
    setStocks(data.stocks)
  } catch (error) {
    console.error('Failed to fetch stocks:', error)
  }
}
*/