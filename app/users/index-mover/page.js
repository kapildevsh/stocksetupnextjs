'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const indexMovers = [
  { name: 'NIFTY 50', value: 21850.45, change: 145.30, changePercent: 0.67, type: 'gainer' },
  { name: 'SENSEX', value: 72240.26, change: 389.56, changePercent: 0.54, type: 'gainer' },
  { name: 'NIFTY BANK', value: 46780.90, change: -234.50, changePercent: -0.50, type: 'loser' },
  { name: 'NIFTY IT', value: 34567.80, change: 456.20, changePercent: 1.34, type: 'gainer' },
  { name: 'NIFTY AUTO', value: 17890.45, change: -125.30, changePercent: -0.70, type: 'loser' },
]

export default function IndexMoverPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Index Mover
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Index Movers</h2>
              <p className="text-gray-600 mt-2">Track major index movements and trends</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Top Gainers</h3>
                <div className="text-4xl font-bold">{indexMovers.filter(i => i.type === 'gainer').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Top Losers</h3>
                <div className="text-4xl font-bold">{indexMovers.filter(i => i.type === 'loser').length}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Index Performance</CardTitle>
              <CardDescription>Real-time index data and movements</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Index Name</TableHead>
                    <TableHead className="text-right font-bold">Value</TableHead>
                    <TableHead className="text-right font-bold">Change</TableHead>
                    <TableHead className="text-right font-bold">Change %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indexMovers.map((index, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold">{index.name}</TableCell>
                      <TableCell className="text-right font-medium">{index.value.toFixed(2)}</TableCell>
                      <TableCell className={`text-right font-semibold ${index.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {index.change > 0 ? '+' : ''}{index.change.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={index.changePercent > 0 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0' 
                          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                          {index.changePercent > 0 ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
                          {Math.abs(index.changePercent).toFixed(2)}%
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