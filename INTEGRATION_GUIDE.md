# Google OAuth + FastAPI Backend Integration Guide

## 🔐 Complete Setup Instructions

### Step 1: Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**
   - Click "Select a project" → "New Project"
   - Enter project name: "StockMarket Pro"
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Configure consent screen if prompted:
     - User Type: External
     - App name: StockMarket Pro
     - User support email: your-email@example.com
     - Developer contact: your-email@example.com
   - Application type: "Web application"
   - Name: "StockMarket Pro Web Client"
   - Authorized JavaScript origins:
     - http://localhost:3000
     - https://nextstocks.preview.emergentagent.com
     - (Add your production domain)
   - Authorized redirect URIs:
     - http://localhost:3000
     - https://nextstocks.preview.emergentagent.com
   - Click "Create"
   - **Copy the Client ID** (looks like: xxxxx.apps.googleusercontent.com)

5. **Update .env File**
   ```bash
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
   ```

---

## 🔧 FastAPI Backend Setup

### Required Endpoint: `POST /auth/google`

Your FastAPI backend needs to implement this authentication endpoint.

#### Request Format

```json
POST https://localhost:8000/auth/google
Content-Type: application/json

{
  "token": "google_access_token_here"
}
```

#### Expected Response Format

```json
{
  "access_token": "your_jwt_token_here",
  "token_type": "bearer",
  "user": {
    "id": "user_uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "user"  // or "admin"
  }
}
```

#### Python Implementation Example

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
from datetime import datetime, timedelta

app = FastAPI()

# Your configuration
GOOGLE_CLIENT_ID = "your-google-client-id"
JWT_SECRET = "your-secret-key"
JWT_ALGORITHM = "HS256"

class GoogleAuthRequest(BaseModel):
    token: str

@app.post("/auth/google")
async def google_auth(auth_request: GoogleAuthRequest):
    try:
        # Verify the Google token
        idinfo = id_token.verify_oauth2_token(
            auth_request.token,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )
        
        # Extract user information
        email = idinfo.get('email')
        name = idinfo.get('name')
        google_id = idinfo.get('sub')
        
        # Check if user exists in PostgreSQL database
        # If not, create new user
        # user = get_or_create_user(email, name, google_id)
        
        # Determine user role from database
        # role = user.role  # 'user' or 'admin'
        role = 'user'  # Default for demo
        
        # Create JWT token
        jwt_payload = {
            'user_id': 'some-uuid',
            'email': email,
            'role': role,
            'exp': datetime.utcnow() + timedelta(days=7)
        }
        
        jwt_token = jwt.encode(jwt_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
        return {
            'access_token': jwt_token,
            'token_type': 'bearer',
            'user': {
                'id': 'some-uuid',
                'email': email,
                'name': name,
                'role': role
            }
        }
        
    except ValueError as e:
        raise HTTPException(status_code=401, detail="Invalid token")
```

#### Install Required Python Packages

```bash
pip install fastapi
pip install google-auth
pip install pyjwt
pip install psycopg2-binary  # For PostgreSQL
```

---

## 📊 PostgreSQL Database Schema

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    google_id VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',  -- 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_id ON users(google_id);

-- JWT tokens (optional - for token blacklist/tracking)
CREATE TABLE auth_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔄 Complete Authentication Flow

### Frontend Flow (Already Implemented)

1. **User clicks "Login" button** on navbar
2. **Google OAuth popup** appears automatically (no redirect)
3. **User signs in with Google**
4. **Frontend receives Google access token**
5. **Frontend sends token to your FastAPI**:
   ```javascript
   POST https://localhost:8000/auth/google
   Body: { "token": "google_access_token" }
   ```
6. **Backend validates token with Google**
7. **Backend creates/updates user in PostgreSQL**
8. **Backend returns JWT token and user data**
9. **Frontend stores JWT in localStorage**:
   ```javascript
   localStorage.setItem('jwt_token', access_token)
   localStorage.setItem('user_data', JSON.stringify(user))
   ```
10. **Frontend redirects based on role**:
    - `role === 'admin'` → `/admin/dashboard`
    - `role === 'user'` → `/users`

### Backend Responsibilities

✅ Validate Google token with Google APIs  
✅ Extract user email, name, Google ID  
✅ Check if user exists in PostgreSQL  
✅ Create new user if doesn't exist  
✅ Determine user role from database  
✅ Generate JWT token  
✅ Return JWT + user data to frontend  

---

## 🧪 Testing the Integration

### 1. Test Google OAuth

Open browser console and test:

```javascript
// Check if Google library loaded
console.log(window.google)

// Test login flow
// Click the Login button and check:
// 1. Google popup appears
// 2. After login, check localStorage
console.log(localStorage.getItem('jwt_token'))
console.log(localStorage.getItem('user_data'))
```

### 2. Test Backend Endpoint

```bash
# Test with curl (replace with actual Google token)
curl -X POST https://localhost:8000/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token": "google_access_token_here"}'

# Expected response:
# {
#   "access_token": "jwt_token_here",
#   "token_type": "bearer",
#   "user": {
#     "id": "uuid",
#     "email": "user@example.com",
#     "name": "User Name",
#     "role": "user"
#   }
# }
```

---

## 🔒 Security Best Practices

### 1. HTTPS in Production
```python
# FastAPI - Enforce HTTPS
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
app.add_middleware(HTTPSRedirectMiddleware)
```

### 2. CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://nextstocks.preview.emergentagent.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 3. JWT Token Security
```python
# Use strong secret key
JWT_SECRET = os.environ.get('JWT_SECRET')  # From environment variable

# Set appropriate expiry
'exp': datetime.utcnow() + timedelta(days=7)

# Consider refresh tokens for better security
```

### 4. Rate Limiting
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/auth/google")
@limiter.limit("5/minute")  # Max 5 login attempts per minute
async def google_auth(request: Request, auth_request: GoogleAuthRequest):
    # ... your code
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Google library not loaded"
**Solution**: Make sure the Google script is loaded before clicking login. The script is added in `layout.js`.

### Issue 2: "Invalid token" error from backend
**Solution**: 
- Verify Google Client ID matches in both frontend and backend
- Check token is being sent correctly
- Ensure backend can access Google's token verification API

### Issue 3: CORS errors
**Solution**: 
- Add frontend URL to CORS allowed origins in FastAPI
- Include credentials: `allow_credentials=True`

### Issue 4: JWT token expired
**Solution**: Frontend automatically handles this - redirects to login on 401 response.

---

## 📱 Environment Variables Summary

### Frontend (.env)
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
NEXT_PUBLIC_API_URL=https://localhost:8000
```

### Backend (FastAPI .env)
```bash
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
JWT_SECRET=your-super-secret-key-here
JWT_ALGORITHM=HS256
DATABASE_URL=postgresql://user:password@localhost:5432/stockmarket_db
```

---

## ✅ Checklist Before Going Live

- [ ] Google OAuth credentials created
- [ ] Google Client ID added to frontend .env
- [ ] FastAPI backend `/auth/google` endpoint implemented
- [ ] PostgreSQL database created with users table
- [ ] CORS configured in FastAPI
- [ ] JWT secret key secured (not in code)
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented
- [ ] Error handling tested
- [ ] Token expiry tested
- [ ] User role assignment working
- [ ] Redirect after login tested

---

## 🎯 Quick Start Commands

```bash
# Frontend
cd /app
yarn install
# Add Google Client ID to .env
yarn dev

# Backend (separate project)
cd /your-fastapi-project
pip install -r requirements.txt
# Configure database and environment variables
uvicorn main:app --reload --host 0.0.0.0 --port 8000 --ssl-keyfile=key.pem --ssl-certfile=cert.pem
```

---

## 📞 Support Resources

- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2
- FastAPI Docs: https://fastapi.tiangolo.com/
- JWT.io: https://jwt.io/
- PostgreSQL Docs: https://www.postgresql.org/docs/

---

**Your authentication system is ready! Just add the Google Client ID and implement the FastAPI backend endpoint.** 🚀
