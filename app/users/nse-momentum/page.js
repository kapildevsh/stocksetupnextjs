'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, Clock } from 'lucide-react'
import { apiCall, logout } from '@/lib/api'

export default function NseMomentumPage() {
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const data = await apiCall("/subscriber/intraday/momentum-stocks", {
        method: "GET"
      })

      const mapped = data.map(row => ({
        symbol: row.symbol,
        total_score: Number(row.total_score),
        gap_percent: Number(row.gap_percent),
        avg_in_oi: Number(row.avg_in_oi),
        price_change_percent: Number(row.price_change_percent),
        status: "Active",
        type: row.price_change_percent >= 0 ? "Long" : "Short"
      }))

      setTrades(mapped)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 300)

    const interval = setInterval(fetchData, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-semibold text-purple-700">
            Loading live market data...
          </div>
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
              Intraday Trading
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Market Live</span>
              </div>
              <Button variant="ghost" size="icon" className="relative hover:bg-red-50">
                <Bell className="h-5 w-5 text-red-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
              </Button>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                Subscriber
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-purple-200 hover:bg-purple-50"
              >
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
                Intraday Opportunities
              </h2>
              <p className="text-gray-600 mt-2">Live Most Active Top Gainer / Looser Equity Based signals</p>
            </div>
            <Button onClick={fetchData} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Most Active Top Gainer / Looser NSE Momentum Stocks
              </CardTitle>
              <CardDescription>Powered by NSE Top Gainer / Looser , OI data &amp; Active by Volume , Value</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <colgroup>
                  <col className="w-[140px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                  <col className="w-[120px]" />
                </colgroup>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead>Symbol</TableHead>
                    <TableHead>Score out of 5</TableHead>
                    <TableHead>Avg OI Change</TableHead>
                    <TableHead>GAP (%)</TableHead>
                    <TableHead>Price Change (%)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trades.map((trade, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-purple-700">
                        {trade.symbol}
                      </TableCell>
                      <TableCell className="text-left">
                        {trade.total_score}
                      </TableCell>
                      <TableCell className="text-left">
                        {trade.avg_in_oi}
                      </TableCell>
                      <TableCell className="text-left">
                        {trade.gap_percent}
                      </TableCell>
                      <TableCell>
                        <Badge className={trade.type === 'Long'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'}>
                          {trade.price_change_percent.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-600 text-white">
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
