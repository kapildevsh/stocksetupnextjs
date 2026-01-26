'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const API_BASE = "http://localhost:8000" 
// change to https://api.yourdomain.com in production

export default function IntradayPage() {
  const router = useRouter()
  const [intradayTrades, setIntradayTrades] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token")
      console.log("TOKEN:", token)
      // If token not yet available, just wait silently
      if (!token) {
        return
      }

      const res = await fetch(`${API_BASE}/subscriber/nse/oi-live`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (res.status === 401) {
        throw new Error("Unauthorized")
      }

      const data = await res.json()
      console.log(data)

      const mapped = data.map(row => ({
        symbol: row.symbol,
        time: new Date(row.createdtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        LTP: Number(row.eq_lastPrice),
        PChange: Number(row.eq_pChange),
        avgInOI: Number(row.avgInOI),
        volume: Number(row.volume),
        status: "Active",
        type: row.eq_pChange >= 0 ? "Long" : "Short"
      }))

      setIntradayTrades(mapped)
    } catch (err) {
      console.error(err)
      alert("Session expired. Please login again.")
      localStorage.clear()
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Small delay so token is surely available
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
    return <div className="p-10 text-xl">Loading live market data...</div>
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
                onClick={() => {
                  localStorage.clear()
                  router.push("/")
                }}
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
              <p className="text-gray-600 mt-2">Live NSE OI based signals</p>
            </div>
            <Button onClick={fetchData} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Live Intraday Calls
              </CardTitle>
              <CardDescription>Powered by NSE OI data</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead>Symbol</TableHead>
                    <TableHead>LTP</TableHead>
                    <TableHead>GAP (%)</TableHead>
                    <TableHead>Price Change (%)</TableHead>
                    <TableHead className="text-right">Avg in OI</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intradayTrades.map((trade, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-purple-700">
                        {trade.symbol}
                      </TableCell>
                      <TableCell className="text-right">
                        {trade.LTP.toFixed(2)}
                      </TableCell>
                        <TableCell >
                        <Badge className={trade.type === 'Long'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'}>
                        {trade.PChange.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell >
                        <Badge className={trade.type === 'Long'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'}>
                        {trade.PChange.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {trade.avgInOI.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {trade.volume}
                      </TableCell>

                      <TableCell className="text-right">{trade.time}</TableCell>
                      
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
