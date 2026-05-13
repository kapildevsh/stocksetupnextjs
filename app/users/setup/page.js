'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { logout, getVwapScanner } from '@/lib/api'

export default function SetupPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastFetch, setLastFetch] = useState(null)

  const fetchData = async () => {
    try {
      const res = await getVwapScanner()
      setData(res)
      setLastFetch(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const stocks = data?.stocks || []
  const signals = stocks.filter(s => s.signal_at)
  const scanActive = data?.scan_active ?? false

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-semibold text-purple-700">Loading VWAP scanner...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VWAP Reversal Scanner
            </h1>
            <div className="flex items-center gap-4">
              {lastFetch && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{lastFetch}</span>
                </div>
              )}
              <Button variant="ghost" size="icon" className="relative hover:bg-red-50">
                <Bell className="h-5 w-5 text-red-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">Subscribe User</Badge>
              <Button variant="outline" size="sm" onClick={logout} className="border-purple-200 hover:bg-purple-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VWAP Reversal Setups
              </h2>
              <p className="text-gray-600 mt-2">
                9:15 – 10:30 IST  |  5-Min candles  |  Dhan FNO stocks
                {data?.last_update && (
                  <span className="ml-3 text-xs text-gray-400">Scanner update: {data.last_update.replace('T', ' ')}</span>
                )}
              </p>
            </div>
            <Button onClick={fetchData} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {error ? (
            <Card className="border-0 shadow-lg bg-orange-50 mb-8">
              <CardContent className="p-6 text-orange-700 font-medium">
                {error === 'No scan data available. Scanner may not be running.'
                  ? 'Scanner is not running. Start vwapTest.py between 9:15 – 10:30 IST to see results.'
                  : `Error: ${error}`}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-2">Signals Triggered</h3>
                    <div className="text-3xl font-bold">{signals.length}</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-2">Stocks Watched</h3>
                    <div className="text-3xl font-bold">{stocks.length}</div>
                  </CardContent>
                </Card>
                <Card className={`border-0 shadow-lg text-white ${scanActive
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'}`}>
                  <CardContent className="p-6">
                    <h3 className="text-sm font-semibold mb-2">Scan Status</h3>
                    <div className="text-3xl font-bold">{scanActive ? 'Active' : 'Closed'}</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    VWAP Reversal Watchlist
                  </CardTitle>
                  <CardDescription>★ = Signal triggered  |  Signals appear first</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {stocks.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      No stocks in watchlist yet. Scanner fetches top NSE gainers &amp; losers after 9:15 IST.
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                          <TableHead className="font-bold">Symbol</TableHead>
                          <TableHead className="font-bold">Entry</TableHead>
                          <TableHead className="font-bold">Gap %</TableHead>
                          <TableHead className="font-bold">State</TableHead>
                          <TableHead className="font-bold text-right">VWAP</TableHead>
                          <TableHead className="font-bold text-right">LTP</TableHead>
                          <TableHead className="font-bold text-right">vs VWAP</TableHead>
                          <TableHead className="font-bold text-right">Signal At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stocks.map((s, idx) => {
                          const isSignal = !!s.signal_at
                          const isLong = s.entry === 'LONG'
                          const vsVwap = s.vs_vwap

                          return (
                            <TableRow
                              key={idx}
                              className={isSignal
                                ? 'bg-yellow-50 border-l-4 border-l-yellow-400'
                                : idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}
                            >
                              <TableCell className="font-bold text-purple-700">
                                {isSignal ? '★ ' : ''}{s.symbol}
                              </TableCell>
                              <TableCell>
                                <Badge className={isLong
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                                  : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                                  {isLong
                                    ? <><TrendingUp className="h-3 w-3 mr-1 inline" />LONG</>
                                    : <><TrendingDown className="h-3 w-3 mr-1 inline" />SHORT</>}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">{s.gap?.toFixed(2)}%</TableCell>
                              <TableCell>
                                <Badge className={
                                  isSignal
                                    ? 'bg-yellow-500 text-white border-0'
                                    : s.state === 'ZONE'
                                    ? 'bg-orange-500 text-white border-0'
                                    : s.state === 'RETEST'
                                    ? 'bg-blue-500 text-white border-0'
                                    : 'bg-gray-400 text-white border-0'
                                }>
                                  {s.state}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono">{s.vwap?.toFixed(2) ?? '-'}</TableCell>
                              <TableCell className="text-right font-mono">{s.ltp?.toFixed(2) ?? '-'}</TableCell>
                              <TableCell className={`text-right font-mono font-semibold ${
                                vsVwap == null ? '' : vsVwap > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {vsVwap != null ? (vsVwap > 0 ? `+${vsVwap.toFixed(2)}` : vsVwap.toFixed(2)) : '-'}
                              </TableCell>
                              <TableCell className="text-right font-semibold text-yellow-700">
                                {s.signal_at ?? '-'}
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
