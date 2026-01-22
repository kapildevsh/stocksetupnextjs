import { NextResponse } from 'next/server'

// ========================================
// FASTAPI BACKEND INTEGRATION
// ========================================
// This Next.js API route is a proxy to your FastAPI backend
// All requests will be forwarded to FastAPI backend
// FastAPI handles PostgreSQL database connections
// ========================================

// MongoDB REMOVED - Using PostgreSQL via FastAPI backend
// No database connection needed in Next.js frontend

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// ========================================
// ROUTE HANDLER - Proxy to FastAPI Backend
// ========================================
// All API requests will be forwarded to your FastAPI backend
// Configure FASTAPI_URL in .env file

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000'

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    // ========================================
    // EXAMPLE: Proxy to FastAPI Backend
    // ========================================
    // Uncomment and modify this code to proxy requests to FastAPI
    /*
    const fastApiUrl = `${FASTAPI_URL}/api${route}`
    
    // Get request body if present
    let body
    if (method !== 'GET' && method !== 'HEAD') {
      body = await request.text()
    }
    
    // Get JWT token from Authorization header
    const authHeader = request.headers.get('Authorization')
    
    // Forward request to FastAPI
    const fastApiResponse = await fetch(fastApiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { 'Authorization': authHeader }),
      },
      ...(body && { body }),
    })
    
    const data = await fastApiResponse.json()
    
    return handleCORS(NextResponse.json(data, { 
      status: fastApiResponse.status 
    }))
    */

    // ========================================
    // TEMPORARY: Mock Response
    // ========================================
    // Remove this once FastAPI backend is ready
    
    // Health check endpoint
    if (route === '/health' && method === 'GET') {
      return handleCORS(NextResponse.json({ 
        status: "ok",
        message: "Next.js API is running. Configure FASTAPI_URL to connect to backend." 
      }))
    }

    // Default response
    return handleCORS(NextResponse.json({ 
      message: "Next.js API proxy ready. Configure your FastAPI backend.",
      route: route,
      method: method,
      note: "Uncomment proxy code in route.js to forward requests to FastAPI"
    }))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error", details: error.message }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute