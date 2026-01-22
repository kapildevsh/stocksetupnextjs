'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const fiiDiiData = [
  { date: '20-JAN-2025', fiiCash: 2456.50, diiCash: 1892.30, fiiFO: -1234.80, diiFO: 987.60, netFII: 1221.70, netDII: 2879.90 },
  { date: '19-JAN-2025', fiiCash: 1892.40, diiCash: 2145.60, fiiFO: -987.50, diiFO: 1234.20, netFII: 904.90, netDII: 3379.80 },
  { date: '18-JAN-2025', fiiCash: -1456.30, diiCash: 2567.80, fiiFO: -2345.60, diiFO: 1567.40, netFII: -3801.90, netDII: 4135.20 },
  { date: '17-JAN-2025', fiiCash: 3245.70, diiCash: 1678.90, fiiFO: 1456.80, diiFO: -892.50, netFII: 4702.50, netDII: 786.40 },
  { date: '16-JAN-2025', fiiCash: 2789.60, diiCash: 1956.40, fiiFO: 987.30, diiFO: 1234.80, netFII: 3776.90, netDII: 3191.20 },
]

export default function FIIDIIPage() {
  const router = useRouter()
  
  const totalFII = fiiDiiData.reduce((acc, d) => acc + d.netFII, 0)
  const totalDII = fiiDiiData.reduce((acc, d) => acc + d.netDII, 0)
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              FII/DII Data
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Foreign & Domestic Institutional Data</h2>
              <p className="text-gray-600 mt-2">Track FII and DII buying/selling activity</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Net FII (5 Days)</h3>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold">₹{Math.abs(totalFII).toFixed(2)}Cr</div>
                  {totalFII > 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                </div>
                <p className="text-blue-100 mt-2 text-sm">{totalFII > 0 ? 'Net Buying' : 'Net Selling'}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Net DII (5 Days)</h3>
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold">₹{Math.abs(totalDII).toFixed(2)}Cr</div>
                  {totalDII > 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                </div>
                <p className="text-green-100 mt-2 text-sm">{totalDII > 0 ? 'Net Buying' : 'Net Selling'}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Daily FII/DII Activity</CardTitle>
              <CardDescription>Cash and F&O segment data (in Crores)</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Date</TableHead>
                    <TableHead className="text-right font-bold">FII Cash</TableHead>
                    <TableHead className="text-right font-bold">DII Cash</TableHead>
                    <TableHead className="text-right font-bold">FII F&O</TableHead>
                    <TableHead className="text-right font-bold">DII F&O</TableHead>
                    <TableHead className="text-right font-bold">Net FII</TableHead>
                    <TableHead className="text-right font-bold">Net DII</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fiiDiiData.map((data, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold">{data.date}</TableCell>
                      <TableCell className={`text-right font-semibold ${data.fiiCash > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.fiiCash > 0 ? '+' : ''}{data.fiiCash.toFixed(2)}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${data.diiCash > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.diiCash > 0 ? '+' : ''}{data.diiCash.toFixed(2)}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${data.fiiFO > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.fiiFO > 0 ? '+' : ''}{data.fiiFO.toFixed(2)}
                      </TableCell>
                      <TableCell className={`text-right font-semibold ${data.diiFO > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.diiFO > 0 ? '+' : ''}{data.diiFO.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={data.netFII > 0 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                          {data.netFII > 0 ? '+' : ''}{data.netFII.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={data.netDII > 0 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0'
                          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-0'}>
                          {data.netDII > 0 ? '+' : ''}{data.netDII.toFixed(2)}
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