// ========================================
// API HELPER FUNCTIONS FOR FASTAPI BACKEND
// ========================================
// Authentication handled via HttpOnly cookies
// Browser automatically sends cookies with requests

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"


// ========================================
// USER DATA HELPERS
// ========================================

// Get cached user data (for UI usage)
export const getUserData = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user_data")
    return userData ? JSON.parse(userData) : null
  }
  return null
}


// Save user data after login
export const setUserData = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_data", JSON.stringify(user))
  }
}


// Clear user data on logout
export const clearUserData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user_data")
  }
}


// ========================================
// GENERIC API CALL WRAPPER
// ========================================

export const apiCall = async (endpoint, options = {}) => {

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  }

  try {

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: "include" // IMPORTANT: send cookies
    })

    // Handle Unauthorized
    if (response.status === 401) {

      clearUserData()

      if (typeof window !== "undefined") {
        window.location.href = "/"
      }

      throw new Error("Unauthorized - Please login again")
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || "API request failed")
    }

    return data

  } catch (error) {

    console.error("API call error:", error)
    throw error
  }
}


// ========================================
// AUTHENTICATION APIs
// ========================================


// Google OAuth Login
export const googleLogin = async (googleToken) => {

  const data = await apiCall("/auth/google", {
    method: "POST",
    body: JSON.stringify({
      token: googleToken
    })
  })

  // Save user info locally (not token)
  setUserData(data.user)

  return data
}


// Verify session (check cookie)
export const verifyToken = async () => {

  return apiCall("/auth/verify", {
    method: "GET"
  })
}


// Logout
export const logout = async () => {

  try {

    await apiCall("/auth/logout", {
      method: "POST"
    })

  } catch (error) {

    console.error("Logout error:", error)

  } finally {

    clearUserData()

    if (typeof window !== "undefined") {
      window.location.href = "/"
    }
  }
}


// ========================================
// STOCK DATA APIs
// ========================================


// Market overview
export const getStockOverview = async () => {
  return apiCall("/stocks/overview", {
    method: "GET"
  })
}


// Index movers
export const getIndexMovers = async () => {
  return apiCall("/stocks/index-movers", {
    method: "GET"
  })
}


// Option chain data
export const getOptionData = async (symbol) => {
  return apiCall(`/stocks/option-data?symbol=${symbol}`, {
    method: "GET"
  })
}


// Futures data
export const getFutureData = async () => {
  return apiCall("/stocks/future-data", {
    method: "GET"
  })
}


// Swing trade setups
export const getSwingTrades = async () => {
  return apiCall("/stocks/swing-trades", {
    method: "GET"
  })
}


// Intraday setups
export const getIntradayTrades = async () => {
  return apiCall("/stocks/intraday", {
    method: "GET"
  })
}


// Option strategies
export const getOptionTrades = async () => {
  return apiCall("/stocks/option-trades", {
    method: "GET"
  })
}


// Technical setups
export const getTechnicalSetups = async () => {
  return apiCall("/stocks/setups", {
    method: "GET"
  })
}


// FII / DII data
export const getFIIDIIData = async () => {
  return apiCall("/stocks/fii-dii", {
    method: "GET"
  })
}