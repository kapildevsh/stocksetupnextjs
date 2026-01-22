'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

const optionTrades = [
  { symbol: 'NIFTY 21900 CE', premium: 125.50, type: 'Call', strategy: 'Buy', lotSize: 50, expiry: '25-JAN' },
  { symbol: 'NIFTY 21800 PE', premium: 98.75, type: 'Put', strategy: 'Sell', lotSize: 50, expiry: '25-JAN' },
  { symbol: 'BANKNIFTY 46800 CE', premium: 245.00, type: 'Call', strategy: 'Buy', lotSize: 25, expiry: '25-JAN' },
  { symbol: 'BANKNIFTY 46500 PE', premium: 189.50, type: 'Put', strategy: 'Buy', lotSize: 25, expiry: '25-JAN' },
  { symbol: 'RELIANCE 2450 CE', premium: 45.80, type: 'Call', strategy: 'Sell', lotSize: 250, expiry: '31-JAN' },
]

export default function OptionPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Option Trading
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-red-50">
                <Bell className="h-5 w-5 text-red-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">Subscribe User</Badge>
              <Button variant="outline" size="sm" onClick={() => router.push('/')} className="border-purple-200 hover:bg-purple-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Option Trading Strategies</h2>
              <p className="text-gray-600 mt-2">Call and Put option recommendations</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Call Options</h3>
                <div className="text-4xl font-bold mb-2">{optionTrades.filter(t => t.type === 'Call').length}</div>
                <p className="text-green-100 text-sm">Bullish strategies</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Put Options</h3>
                <div className="text-4xl font-bold mb-2">{optionTrades.filter(t => t.type === 'Put').length}</div>
                <p className="text-red-100 text-sm">Bearish strategies</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Active Option Calls</CardTitle>
              <CardDescription>Recommended option trades with premium and lot size</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Symbol</TableHead>
                    <TableHead className="font-bold">Type</TableHead>
                    <TableHead className="font-bold">Strategy</TableHead>
                    <TableHead className="text-right font-bold">Premium</TableHead>
                    <TableHead className="text-right font-bold">Lot Size</TableHead>
                    <TableHead className="font-bold">Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optionTrades.map((trade, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold text-purple-700">{trade.symbol}</TableCell>
                      <TableCell>
                        <Badge className={trade.type === 'Call' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                          {trade.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={trade.strategy === 'Buy' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'}>
                          {trade.strategy}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">₹{trade.premium.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{trade.lotSize}</TableCell>
                      <TableCell>{trade.expiry}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}