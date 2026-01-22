'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const intradayTrades = [
  { symbol: 'RELIANCE', time: '09:45', entry: 2456.50, target: 2475.00, stopLoss: 2448.00, status: 'Active', type: 'Long' },
  { symbol: 'TCS', time: '10:15', entry: 3789.00, target: 3805.00, stopLoss: 3780.00, status: 'Target Hit', type: 'Long' },
  { symbol: 'INFY', time: '11:30', entry: 1568.50, target: 1560.00, stopLoss: 1573.00, status: 'Active', type: 'Short' },
  { symbol: 'HDFC BANK', time: '12:00', entry: 1695.00, target: 1705.00, stopLoss: 1690.00, status: 'Active', type: 'Long' },
  { symbol: 'ICICI BANK', time: '13:45', entry: 1092.00, target: 1098.00, stopLoss: 1089.00, status: 'Pending', type: 'Long' },
]

export default function IntradayPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Intraday Trading
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Market Open</span>
              </div>
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Intraday Opportunities</h2>
              <p className="text-gray-600 mt-2">Quick day trading setups and signals</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Active Trades</h3>
                <div className="text-3xl font-bold">{intradayTrades.filter(t => t.status === 'Active').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Target Hit</h3>
                <div className="text-3xl font-bold">{intradayTrades.filter(t => t.status === 'Target Hit').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Pending</h3>
                <div className="text-3xl font-bold">{intradayTrades.filter(t => t.status === 'Pending').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Long Positions</h3>
                <div className="text-3xl font-bold">{intradayTrades.filter(t => t.type === 'Long').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Today's Intraday Calls</CardTitle>
              <CardDescription>Real-time intraday trading signals</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Time</TableHead>
                    <TableHead className="font-bold">Symbol</TableHead>
                    <TableHead className="font-bold">Type</TableHead>
                    <TableHead className="text-right font-bold">Entry</TableHead>
                    <TableHead className="text-right font-bold">Target</TableHead>
                    <TableHead className="text-right font-bold">Stop Loss</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intradayTrades.map((trade, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-medium">{trade.time}</TableCell>
                      <TableCell className="font-bold text-purple-700">{trade.symbol}</TableCell>
                      <TableCell>
                        <Badge className={trade.type === 'Long' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                          {trade.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">{trade.entry.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">{trade.target.toFixed(2)}</TableCell>
                      <TableCell className="text-right text-red-600 font-semibold">{trade.stopLoss.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={
                          trade.status === 'Active' 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0'
                            : trade.status === 'Target Hit'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'
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