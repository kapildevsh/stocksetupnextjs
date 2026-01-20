'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, LogOut, Users, DollarSign, Activity, Settings } from 'lucide-react'
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
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StockMarket Pro - Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="default">Admin</Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
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
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor activity, and view analytics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Users</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeUsers} active users
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Subscribed Users</CardDescription>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribedUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((subscribedUsers / totalUsers) * 100).toFixed(0)}% conversion rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Last 4 months
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Growth Rate</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+24%</div>
              <p className="text-xs text-muted-foreground mt-1">
                vs previous period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'Subscribe' ? 'default' : 'secondary'}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'Active' ? 'default' : 'outline'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
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
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and user growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-right">New Users</TableHead>
                        <TableHead className="text-right">Avg. per User</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockRevenue.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.month}</TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">{item.users}</TableCell>
                          <TableCell className="text-right">
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
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New user registration</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com joined</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Subscription upgrade</p>
                      <p className="text-xs text-muted-foreground">User upgraded to Premium</p>
                    </div>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System maintenance</p>
                      <p className="text-xs text-muted-foreground">Scheduled maintenance completed</p>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
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