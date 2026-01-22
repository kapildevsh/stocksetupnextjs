'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

const futureData = [
  { symbol: 'NIFTY FUT', expiry: '25-JAN-2025', ltp: 21875.50, change: 152.30, oi: '1.2Cr', volume: '45.6L' },
  { symbol: 'BANKNIFTY FUT', expiry: '25-JAN-2025', ltp: 46825.75, change: -189.25, oi: '87.3L', volume: '32.8L' },
  { symbol: 'RELIANCE FUT', expiry: '31-JAN-2025', ltp: 2456.80, change: 23.50, oi: '2.8Cr', volume: '18.9L' },
  { symbol: 'TCS FUT', expiry: '31-JAN-2025', ltp: 3789.60, change: 45.80, oi: '1.5Cr', volume: '12.4L' },
  { symbol: 'INFY FUT', expiry: '31-JAN-2025', ltp: 1567.90, change: -12.30, oi: '2.1Cr', volume: '15.7L' },
]

export default function FutureDataPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Future Data
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Futures & Derivatives</h2>
              <p className="text-gray-600 mt-2">Track futures contracts and open interest</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Active Futures Contracts</CardTitle>
              <CardDescription>Real-time futures pricing and open interest data</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Symbol</TableHead>
                    <TableHead className="font-bold">Expiry</TableHead>
                    <TableHead className="text-right font-bold">LTP</TableHead>
                    <TableHead className="text-right font-bold">Change</TableHead>
                    <TableHead className="text-right font-bold">Open Interest</TableHead>
                    <TableHead className="text-right font-bold">Volume</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {futureData.map((future, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold text-purple-700">{future.symbol}</TableCell>
                      <TableCell>{future.expiry}</TableCell>
                      <TableCell className="text-right font-medium">{future.ltp.toFixed(2)}</TableCell>
                      <TableCell className={`text-right font-semibold ${future.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {future.change > 0 ? '+' : ''}{future.change.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">{future.oi}</TableCell>
                      <TableCell className="text-right">{future.volume}</TableCell>
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