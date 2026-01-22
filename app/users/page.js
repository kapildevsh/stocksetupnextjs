'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { LogOut, Search, RefreshCw, TrendingDown, Bell, Menu } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Sidebar from '@/components/Sidebar'

// Mock stock data
const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.45, change: 2.34, changePercent: 1.33, volume: '52.3M', marketCap: '2.8T' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.67, change: -1.23, changePercent: -0.85, volume: '28.1M', marketCap: '1.8T' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.34, change: 5.67, changePercent: 1.39, volume: '31.2M', marketCap: '3.1T' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.92, change: 3.45, changePercent: 1.97, volume: '45.6M', marketCap: '1.9T' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.56, change: -4.32, changePercent: -1.81, volume: '98.7M', marketCap: '745B' },
  { symbol: 'META', name: 'Meta Platforms', price: 512.78, change: 8.90, changePercent: 1.77, volume: '18.5M', marketCap: '1.3T' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 892.45, change: 15.23, changePercent: 1.74, volume: '42.1M', marketCap: '2.2T' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.23, change: -0.87, changePercent: -0.44, volume: '12.3M', marketCap: '578B' },
  { symbol: 'V', name: 'Visa Inc.', price: 287.65, change: 2.11, changePercent: 0.74, volume: '8.9M', marketCap: '589B' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 167.89, change: 1.23, changePercent: 0.74, volume: '7.2M', marketCap: '456B' }
]

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [stocks, setStocks] = useState(mockStocks)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    router.push('/')
  }

  const handleRefresh = () => {
    alert('Stock data refreshed!')
  }

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-red-50">
                <Bell className="h-5 w-5 text-red-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">Subscribe User</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-200 hover:bg-purple-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stock Market Overview</h2>
              <p className="text-gray-600">
                Real-time stock data and market information
              </p>
            </div>
            <Button onClick={handleRefresh} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>

          {/* Market Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-purple-100">Total Stocks</CardDescription>
                <CardTitle className="text-3xl">{stocks.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-green-100">Gainers</CardDescription>
                <CardTitle className="text-3xl">
                  {stocks.filter(s => s.change > 0).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-red-100">Losers</CardDescription>
                <CardTitle className="text-3xl">
                  {stocks.filter(s => s.change < 0).length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-white">
              <CardHeader className="pb-3">
                <CardDescription className="text-blue-100">Avg. Change</CardDescription>
                <CardTitle className="text-3xl">
                  {(stocks.reduce((acc, s) => acc + s.changePercent, 0) / stocks.length).toFixed(2)}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Stock Table */}
          <Card className="border-0 shadow-xl bg-white">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Live Stock Data</CardTitle>
                  <CardDescription>Updated stock prices and market data</CardDescription>
                </div>
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-100 hover:to-blue-100">
                      <TableHead className="font-bold">Symbol</TableHead>
                      <TableHead className="font-bold">Company Name</TableHead>
                      <TableHead className="text-right font-bold">Price</TableHead>
                      <TableHead className="text-right font-bold">Change</TableHead>
                      <TableHead className="text-right font-bold">Change %</TableHead>
                      <TableHead className="text-right font-bold">Volume</TableHead>
                      <TableHead className="text-right font-bold">Market Cap</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStocks.length > 0 ? (
                      filteredStocks.map((stock, index) => (
                        <TableRow key={stock.symbol} className={index % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                          <TableCell className="font-bold text-purple-700">{stock.symbol}</TableCell>
                          <TableCell className="font-medium">{stock.name}</TableCell>
                          <TableCell className="text-right font-bold">${stock.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            <span className={stock.change > 0 ? 'text-green-600' : 'text-red-600'}>
                              {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              className={stock.changePercent > 0 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0' 
                                : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}
                            >
                              {Math.abs(stock.changePercent).toFixed(2)}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{stock.volume}</TableCell>
                          <TableCell className="text-right font-medium">{stock.marketCap}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No stocks found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}