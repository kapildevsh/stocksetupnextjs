'use client'

import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { LogOut, Bell, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

const optionData = [
  { strike: 21800, callOI: '45.2L', putOI: '32.1L', callVolume: '15.3L', putVolume: '12.4L', pcr: 0.71 },
  { strike: 21850, callOI: '52.8L', putOI: '48.9L', callVolume: '18.7L', putVolume: '22.1L', pcr: 0.93 },
  { strike: 21900, callOI: '68.4L', putOI: '72.3L', callVolume: '25.6L', putVolume: '28.9L', pcr: 1.06 },
  { strike: 21950, callOI: '35.7L', putOI: '41.2L', callVolume: '14.2L', putVolume: '16.8L', pcr: 1.15 },
  { strike: 22000, callOI: '28.9L', putOI: '53.6L', callVolume: '11.5L', putVolume: '19.4L', pcr: 1.85 },
]

export default function OptionDataPage() {
  const router = useRouter()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Sidebar />
      <div className="flex-1">
        <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Option Data
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
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Option Chain Analysis</h2>
              <p className="text-gray-600 mt-2">Open Interest and Volume data for options</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">NIFTY Option Chain</CardTitle>
              <CardDescription>Call and Put Open Interest & Volume</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100">
                    <TableHead className="font-bold">Strike Price</TableHead>
                    <TableHead className="text-right font-bold">Call OI</TableHead>
                    <TableHead className="text-right font-bold">Put OI</TableHead>
                    <TableHead className="text-right font-bold">Call Volume</TableHead>
                    <TableHead className="text-right font-bold">Put Volume</TableHead>
                    <TableHead className="text-right font-bold">PCR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optionData.map((option, idx) => (
                    <TableRow key={idx} className={idx % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                      <TableCell className="font-bold text-purple-700">{option.strike}</TableCell>
                      <TableCell className="text-right">{option.callOI}</TableCell>
                      <TableCell className="text-right">{option.putOI}</TableCell>
                      <TableCell className="text-right">{option.callVolume}</TableCell>
                      <TableCell className="text-right">{option.putVolume}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={option.pcr > 1 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0' 
                          : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-0'}>
                          {option.pcr.toFixed(2)}
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