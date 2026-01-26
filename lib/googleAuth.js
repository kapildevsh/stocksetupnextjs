// lib/googleAuth.js
// Complete Google Login helper for Next.js + FastAPI
// Uses Google official button renderer (never blocked)

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client"
const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL

// Load Google SDK (only once)
export const initGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve()

    // Already loaded
    if (window.google && window.google.accounts) {
      return resolve()
    }

    // Avoid loading multiple times
    const existingScript = document.getElementById("google-oauth-script")
    if (existingScript) {
      existingScript.onload = resolve
      return
    }

    const script = document.createElement("script")
    script.id = "google-oauth-script"
    script.src = GOOGLE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      console.log("Google SDK loaded")
      resolve()
    }
    script.onerror = () => reject(new Error("Failed to load Google SDK"))
    document.head.appendChild(script)
  })
}

// Trigger Google Login and get ID token (guaranteed popup)
export const signInWithGoogle = async () => {
  await initGoogleAuth()

  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.accounts) {
      reject(new Error("Google SDK not loaded"))
      return
    }

    // Create hidden container for official Google button
    let container = document.getElementById("google-hidden-container")
    if (!container) {
      container = document.createElement("div")
      container.id = "google-hidden-container"
      container.style.display = "none"
      document.body.appendChild(container)
    } else {
      container.innerHTML = ""
    }

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response) => {
        console.log("GOOGLE RESPONSE:", response)
        console.log("ID TOKEN:", response.credential)

        if (!response.credential) {
          reject(new Error("No ID token received from Google"))
          return
        }

        resolve(response.credential) // <-- ID TOKEN (JWT)
      }
    })

    // Render official Google button
    window.google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large"
    })

    // Programmatically click the rendered button
    const googleBtn = container.querySelector("div[role=button]")
    if (!googleBtn) {
      reject(new Error("Google button not rendered"))
      return
    }

    googleBtn.click()
  })
}

// Send token to backend
export const authenticateWithBackend = async (idToken) => {
  const response = await fetch(`${FASTAPI_URL}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: idToken })
  })

  if (!response.ok) {
    const err = await response.json()
    throw new Error(err.detail || "Authentication failed")
  }

  return response.json()
}

// Complete login flow (call this from your button)
export const handleGoogleLogin = async () => {
  try {
    // 1. Google login
    const idToken = await signInWithGoogle()

    // 2. Backend auth
    const data = await authenticateWithBackend(idToken)

    // 3. Store session
    localStorage.setItem("access_token", data.access_token)
    localStorage.setItem("user_data", JSON.stringify(data.user))
    localStorage.setItem("user_type", data.user.role)

    return data
  } catch (error) {
    console.error("Google login error:", error)
    throw error
  }
}
