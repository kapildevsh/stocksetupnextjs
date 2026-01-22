# Stock Market Pro - Next.js Frontend

A vibrant and modern stock market application built with Next.js, featuring real-time data, beautiful UI with gradients, and comprehensive trading tools.

## 🏗️ Architecture

### Frontend (This Project)
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Google OAuth with JWT tokens
- **Storage**: localStorage for JWT tokens
- **Data Fetching**: API calls to FastAPI backend

### Backend (Separate Project)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **APIs**: Stock data, user management, trading operations

## 📁 Project Structure

```
/app
├── app/
│   ├── page.js                    # Landing page
│   ├── auth/
│   │   └── page.js                # Google OAuth login
│   ├── users/                     # User dashboard & pages
│   │   ├── page.js                # Main dashboard
│   │   ├── index-mover/           # Index movements
│   │   ├── option-data/           # Option chain data
│   │   ├── future-data/           # Futures data
│   │   ├── swing-trade/           # Swing trading
│   │   ├── intraday/              # Intraday trading
│   │   ├── option/                # Option trading
│   │   ├── setup/                 # Technical setups
│   │   └── fii-dii/               # FII/DII data
│   ├── admin/
│   │   └── dashboard/             # Admin panel
│   ├── about/                     # About page
│   ├── contact/                   # Contact page
│   ├── testimony/                 # Testimonials
│   ├── membership/                # Pricing plans
│   └── api/[[...path]]/route.js   # API proxy to FastAPI
├── components/
│   ├── Sidebar.jsx                # Navigation sidebar
│   └── ui/                        # shadcn components
├── lib/
│   ├── api.js                     # API helper functions
│   └── utils.js                   # Utility functions
├── middleware/                    # Middleware folder
├── route/                         # Route folder
└── image/                         # Image assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Yarn package manager
- FastAPI backend running (separate project)
- Google OAuth credentials

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
# FastAPI Backend URL
FASTAPI_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000

# Google OAuth (from Google Cloud Console)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

3. Run development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication Flow

### Google OAuth Integration

1. **User clicks "Continue with Google"** on `/auth` page
2. **Google OAuth popup** authenticates user
3. **Frontend receives Google token**
4. **Send to FastAPI backend**:
   ```javascript
   POST /api/auth/google
   Body: {
     token: "google_oauth_token",
     user_type: "user" or "admin"
   }
   ```
5. **Backend validates token with Google**
6. **Backend creates/updates user in PostgreSQL**
7. **Backend returns JWT token**:
   ```json
   {
     "access_token": "jwt_token_here",
     "user_type": "user",
     "user": {
       "id": "user_id",
       "email": "user@example.com",
       "name": "User Name"
     }
   }
   ```
8. **Frontend stores JWT in localStorage**:
   ```javascript
   localStorage.setItem('jwt_token', access_token)
   localStorage.setItem('user_type', user_type)
   localStorage.setItem('user_data', JSON.stringify(user))
   ```
9. **Redirect to dashboard** based on user type

### Making Authenticated Requests

All API requests include JWT token in headers:

```javascript
import { apiCall } from '@/lib/api'

// Example: Fetch stock data
const data = await apiCall('/api/stocks/overview', {
  method: 'GET'
})

// The JWT token is automatically added to headers:
// Authorization: Bearer <jwt_token>
```

### Token Expiry Handling

When token expires (401 response):
1. Remove token from localStorage
2. Redirect to `/auth` page
3. User logs in again

## 📡 API Integration

### Helper Functions Available

Located in `/lib/api.js`:

```javascript
// Authentication
import { googleLogin, logout, verifyToken } from '@/lib/api'

// Stock Data APIs
import { 
  getStockOverview,
  getIndexMovers,
  getOptionData,
  getFutureData,
  getSwingTrades,
  getIntradayTrades,
  getOptionTrades,
  getTechnicalSetups,
  getFIIDIIData 
} from '@/lib/api'
```

### Usage Example

```javascript
'use client'
import { useState, useEffect } from 'react'
import { getStockOverview } from '@/lib/api'

export default function StockPage() {
  const [stocks, setStocks] = useState([])
  
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStockOverview()
        setStocks(data.stocks)
      } catch (error) {
        console.error('Failed to fetch stocks:', error)
      }
    }
    fetchStocks()
  }, [])
  
  return (
    <div>
      {stocks.map(stock => (
        <div key={stock.symbol}>{stock.name}</div>
      ))}
    </div>
  )
}
```

## 🎨 UI Components

### Sidebar Navigation

Located in `/components/Sidebar.jsx`:

Three main sections:
- **Index**: Index Mover, Option Data, Future Data
- **Stocks**: Swing Trade, Intraday, Option, Setup
- **FII/DII**: FII/DII Data

### Colorful Design System

- **Purple/Blue gradients**: Primary elements
- **Green**: Positive values, gainers
- **Red**: Negative values, losers
- **Orange/Pink**: Highlights and accents
- **Cyan/Blue**: Information cards

## 🔧 Backend API Requirements

Your FastAPI backend should implement these endpoints:

### Authentication Endpoints

```python
# POST /api/auth/google
# Validate Google OAuth token and return JWT
{
  "token": "google_oauth_token",
  "user_type": "user" | "admin"
}
→ Returns: { "access_token": "jwt", "user": {...} }

# POST /api/auth/logout
# Invalidate JWT token
Authorization: Bearer <jwt_token>

# GET /api/auth/verify
# Verify JWT token validity
Authorization: Bearer <jwt_token>
```

### Stock Data Endpoints

```python
# GET /api/stocks/overview
# Main dashboard stock data
Authorization: Bearer <jwt_token>

# GET /api/stocks/index-movers
# Index movements (NIFTY, SENSEX, etc.)

# GET /api/stocks/option-data?symbol=NIFTY
# Option chain data

# GET /api/stocks/future-data
# Futures contracts data

# GET /api/stocks/swing-trades
# Swing trading opportunities

# GET /api/stocks/intraday
# Intraday trading signals

# GET /api/stocks/option-trades
# Option trading strategies

# GET /api/stocks/setups
# Technical analysis setups

# GET /api/stocks/fii-dii
# FII/DII institutional data
```

## 📊 Database Schema (PostgreSQL - Backend)

Your FastAPI backend should have these tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  user_type VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- JWT tokens (optional - for token blacklist)
CREATE TABLE tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Stock data tables (design as per your requirements)
-- Add tables for stocks, options, futures, etc.
```

## 🔒 Security Considerations

1. **JWT Tokens**: Stored in localStorage (consider httpOnly cookies for production)
2. **CORS**: Configure allowed origins in FastAPI backend
3. **Token Expiry**: Implement refresh token mechanism
4. **Rate Limiting**: Add rate limiting in FastAPI backend
5. **Input Validation**: Validate all inputs in backend

## 📱 Features

### Guest/Public Pages
- Landing page with features
- About Us
- Contact Us
- Testimonials
- Membership plans

### Authenticated Pages (Users)
- Stock market overview with data tables
- Index movements tracking
- Option chain analysis
- Futures data
- Swing trading setups
- Intraday opportunities
- Option trading strategies
- Technical analysis setups
- FII/DII institutional data

### Admin Pages
- User management
- Revenue tracking
- Activity monitoring
- Analytics dashboard

## 🎯 Next Steps

1. **Set up Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

2. **Configure FastAPI Backend**:
   - Implement authentication endpoints
   - Create PostgreSQL database and tables
   - Implement stock data APIs
   - Set up CORS for Next.js frontend

3. **Connect Frontend to Backend**:
   - Update `FASTAPI_URL` in `.env`
   - Uncomment proxy code in `/app/api/[[...path]]/route.js`
   - Test authentication flow
   - Replace mock data with real API calls

4. **Production Deployment**:
   - Deploy FastAPI backend
   - Deploy Next.js frontend
   - Update environment variables
   - Test end-to-end flow

## 📝 Important Notes

- ❌ **MongoDB is NOT used** - Removed completely
- ✅ **PostgreSQL** - Used via FastAPI backend
- ✅ **JWT Tokens** - Stored in localStorage
- ✅ **Google OAuth** - For authentication
- ✅ **FastAPI** - Handles all backend operations
- ✅ **Next.js** - Frontend UI only

## 🤝 Contributing

This is a stock market trading platform. Follow the established patterns and color scheme when adding new features.

## 📄 License

Private project - All rights reserved

---

Built with ❤️ using Next.js, Tailwind CSS, and shadcn/ui
