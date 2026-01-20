'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, LogOut, Users, DollarSign, Activity, Settings, Sparkles, TrendingDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Subscribe', status: 'Active', joinDate: '2025-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Guest', status: 'Active', joinDate: '2025-02-10' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Subscribe', status: 'Active', joinDate: '2025-01-22' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Subscribe', status: 'Inactive', joinDate: '2024-12-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Guest', status: 'Active', joinDate: '2025-03-01' }
]

const mockRevenue = [
  { month: 'January', amount: 12500, users: 45 },
  { month: 'February', amount: 15800, users: 52 },
  { month: 'March', amount: 18200, users: 67 },
  { month: 'April', amount: 21500, users: 78 }
]

export default function AdminDashboard() {
  const router = useRouter()
  const [users, setUsers] = useState(mockUsers)

  const handleLogout = () => {
    router.push('/')
  }

  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'Active').length
  const subscribedUsers = users.filter(u => u.role === 'Subscribe').length
  const totalRevenue = mockRevenue.reduce((acc, r) => acc + r.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Top Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">StockMarket Pro - Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">Admin</Badge>
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-purple-200 hover:bg-purple-50">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Manage users, monitor activity, and view analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-purple-100">Total Users</CardDescription>
              <Users className="h-5 w-5 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsers}</div>
              <p className="text-xs text-purple-100 mt-1">
                {activeUsers} active users
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-blue-100">Subscribed Users</CardDescription>
              <Activity className="h-5 w-5 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subscribedUsers}</div>
              <p className="text-xs text-blue-100 mt-1">
                {((subscribedUsers / totalUsers) * 100).toFixed(0)}% conversion rate
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-green-100">Total Revenue</CardDescription>
              <DollarSign className="h-5 w-5 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-100 mt-1">
                Last 4 months
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-pink-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="text-orange-100">Growth Rate</CardDescription>
              <TrendingUp className="h-5 w-5 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">+24%</div>
              <p className="text-xs text-orange-100 mt-1">
                vs previous period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white border border-purple-200">
            <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">User Management</TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Revenue</TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white">Activity</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-100 hover:to-blue-100">
                        <TableHead className="font-bold">Name</TableHead>
                        <TableHead className="font-bold">Email</TableHead>
                        <TableHead className="font-bold">Role</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold">Join Date</TableHead>
                        <TableHead className="text-right font-bold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow key={user.id} className={index % 2 === 0 ? 'bg-purple-50/30' : 'bg-white'}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={user.role === 'Subscribe' 
                              ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white border-0' 
                              : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white border-0'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={user.status === 'Active' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0' 
                              : 'bg-gradient-to-r from-red-400 to-red-600 text-white border-0'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="hover:bg-purple-100">Edit</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and user growth</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-100 hover:to-emerald-100">
                        <TableHead className="font-bold">Month</TableHead>
                        <TableHead className="text-right font-bold">Revenue</TableHead>
                        <TableHead className="text-right font-bold">New Users</TableHead>
                        <TableHead className="text-right font-bold">Avg. per User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRevenue.map((item, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'bg-green-50/30' : 'bg-white'}>
                          <TableCell className="font-medium">{item.month}</TableCell>
                          <TableCell className="text-right font-bold text-green-700">
                            ${item.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">{item.users}</TableCell>
                          <TableCell className="text-right font-medium">
                            ${(item.amount / item.users).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="border-0 shadow-xl bg-white">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border-l-4 border-green-500 bg-green-50 rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-gray-600">john.doe@example.com joined</p>
                    </div>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Subscription upgrade</p>
                      <p className="text-xs text-gray-600">User upgraded to Premium</p>
                    </div>
                    <span className="text-xs text-gray-500">5 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-orange-500 bg-orange-50 rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System maintenance</p>
                      <p className="text-xs text-gray-600">Scheduled maintenance completed</p>
                    </div>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 border-l-4 border-purple-500 bg-purple-50 rounded-lg">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New feature released</p>
                      <p className="text-xs text-gray-600">Advanced charting tools now available</p>
                    </div>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}