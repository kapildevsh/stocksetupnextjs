'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { TrendingUp, LogOut, Search, RefreshCw, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [stocks, setStocks] = useState(mockStocks)

  const handleLogout = () => {
    router.push('/')
  }

  const handleRefresh = () => {
    // Simulate data refresh
    alert('Stock data refreshed!')
  }

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StockMarket Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Subscribe User</Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Stock Market Overview</h1>
            <p className="text-muted-foreground">Real-time stock data and market information</p>
          </div>
          <Button onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Market Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Stocks</CardDescription>
              <CardTitle className="text-2xl">{stocks.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Gainers</CardDescription>
              <CardTitle className="text-2xl text-green-600">
                {stocks.filter(s => s.change > 0).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Losers</CardDescription>
              <CardTitle className="text-2xl text-red-600">
                {stocks.filter(s => s.change < 0).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Avg. Change</CardDescription>
              <CardTitle className="text-2xl">
                {(stocks.reduce((acc, s) => acc + s.changePercent, 0) / stocks.length).toFixed(2)}%
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Stock Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Live Stock Data</CardTitle>
                <CardDescription>Updated stock prices and market data</CardDescription>
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Company Name</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Change %</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Market Cap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell className="text-right font-medium">${stock.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <span className={stock.change > 0 ? 'text-green-600' : 'text-red-600'}>
                            {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={stock.changePercent > 0 ? 'default' : 'destructive'}
                            className="gap-1"
                          >
                            {stock.changePercent > 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {Math.abs(stock.changePercent).toFixed(2)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{stock.volume}</TableCell>
                        <TableCell className="text-right">{stock.marketCap}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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
  )
}