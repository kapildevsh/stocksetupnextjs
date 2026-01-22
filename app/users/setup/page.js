'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

const setups = [
  { symbol: 'RELIANCE', pattern: 'Breakout', timeframe: 'Daily', strength: 'Strong', riskReward: '1:3', confidence: 85 },
  { symbol: 'TCS', pattern: 'Cup & Handle', timeframe: 'Weekly', strength: 'Medium', riskReward: '1:2.5', confidence: 75 },
  { symbol: 'INFY', pattern: 'Flag Pattern', timeframe: 'Daily', strength: 'Strong', riskReward: '1:2.8', confidence: 80 },
  { symbol: 'HDFC BANK', pattern: 'Support Bounce', timeframe: '4H', strength: 'Medium', riskReward: '1:2', confidence: 70 },
  { symbol: 'ICICI BANK', pattern: 'Triangle Breakout', timeframe: 'Daily', strength: 'Strong', riskReward: '1:3.5', confidence: 88 },
]

export default function SetupPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Trading Setups
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Technical Analysis Setups</h2>
              <p className="text-gray-600 mt-2">Chart patterns and technical trading opportunities</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Strong Setups</h3>
                <div className="text-3xl font-bold">{setups.filter(s => s.strength === 'Strong').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Medium Setups</h3>
                <div className="text-3xl font-bold">{setups.filter(s => s.strength === 'Medium').length}</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold mb-2">Avg. Confidence</h3>
                <div className="text-3xl font-bold">{(setups.reduce((acc, s) => acc + s.confidence, 0) / setups.length).toFixed(0)}%</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Active Trading Setups</CardTitle>
              <CardDescription>Chart patterns with risk-reward ratios</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Symbol</TableHead>
                    <TableHead className="font-bold">Pattern</TableHead>
                    <TableHead className="font-bold">Timeframe</TableHead>
                    <TableHead className="font-bold">Strength</TableHead>
                    <TableHead className="font-bold">Risk:Reward</TableHead>
                    <TableHead className="text-right font-bold">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {setups.map((setup, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold text-purple-700">{setup.symbol}</TableCell>
                      <TableCell className="font-medium">{setup.pattern}</TableCell>
                      <TableCell>{setup.timeframe}</TableCell>
                      <TableCell>
                        <Badge className={setup.strength === 'Strong' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'}>
                          {setup.strength}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">{setup.riskReward}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={
                          setup.confidence >= 80 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                            : setup.confidence >= 70
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0'
                            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'
                        }>
                          {setup.confidence}%
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