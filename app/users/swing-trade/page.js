'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

const swingTrades = [
  { symbol: 'RELIANCE', entry: 2420.50, target: 2580.00, stopLoss: 2360.00, status: 'Active', duration: '3-5 days' },
  { symbol: 'TCS', entry: 3750.00, target: 3920.00, stopLoss: 3680.00, status: 'Active', duration: '5-7 days' },
  { symbol: 'INFY', entry: 1555.00, target: 1640.00, stopLoss: 1510.00, status: 'Pending', duration: '4-6 days' },
  { symbol: 'HDFC BANK', entry: 1687.50, target: 1765.00, stopLoss: 1645.00, status: 'Active', duration: '3-5 days' },
  { symbol: 'ICICI BANK', entry: 1089.00, target: 1145.00, stopLoss: 1062.00, status: 'Closed', duration: 'Completed' },
]

export default function SwingTradePage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Swing Trade
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Swing Trading Opportunities</h2>
              <p className="text-gray-600 mt-2">Multi-day trading setups with technical analysis</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Active Trades</h3>
                <div className="text-3xl font-bold">{swingTrades.filter(t => t.status === 'Active').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Pending Setups</h3>
                <div className="text-3xl font-bold">{swingTrades.filter(t => t.status === 'Pending').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Completed</h3>
                <div className="text-3xl font-bold">{swingTrades.filter(t => t.status === 'Closed').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Swing Trade Setups</CardTitle>
              <CardDescription>Entry, target, and stop-loss levels</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Symbol</TableHead>
                    <TableHead className="text-right font-bold">Entry</TableHead>
                    <TableHead className="text-right font-bold">Target</TableHead>
                    <TableHead className="text-right font-bold">Stop Loss</TableHead>
                    <TableHead className="font-bold">Duration</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {swingTrades.map((trade, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold text-purple-700">{trade.symbol}</TableCell>
                      <TableCell className="text-right">{trade.entry.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">{trade.target.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-red-600 font-semibold">{trade.stopLoss.toFixed(2)}</TableCell>
                      <TableCell>{trade.duration}</TableCell>
                      <TableCell>
                        <Badge className={
                          trade.status === 'Active' 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                            : trade.status === 'Pending'
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'
                            : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-0'
                        }>
                          {trade.status}
                        </Badge>
                      </TableCell>
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