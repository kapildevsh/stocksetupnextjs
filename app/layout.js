import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'StockMarket Pro - Smart Trading Platform',
  description: 'Real-time stock market data, advanced analytics, and powerful trading tools',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Identity Services Library */}
        <Script 
          src="https://accounts.google.com/gsi/client" 
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}