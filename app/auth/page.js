'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AuthPage() {
  const router = useRouter()
  const [userType, setUserType] = useState('user')
  const [loginEmail, setLoginEmail] = useState('')
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' })

  const handleGoogleLogin = () => {
    // Simulate Google OAuth login
    if (userType === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/users')
    }
  }

  const handleEmailLogin = (e) => {
    e.preventDefault()
    if (userType === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/users')
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    alert('Signup successful! Please login.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex flex-col">
      {/* Navbar */}
      <nav className="border-b bg-white/10 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-xl font-bold text-white">StockMarket Pro</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-50 to-blue-50">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome Back</CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* User Type Selection */}
                <div className="space-y-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                  <Label className="text-sm font-medium">Select User Type (Demo)</Label>
                  <RadioGroup value={userType} onValueChange={setUserType}>
                    <div className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded">
                      <RadioGroupItem value="user" id="user" className="border-purple-600" />
                      <Label htmlFor="user" className="font-normal cursor-pointer flex-1">
                        <span className="font-semibold text-purple-700">Subscribe User</span>
                        <p className="text-xs text-gray-600">Access to full stock data</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-white/50 rounded">
                      <RadioGroupItem value="admin" id="admin" className="border-orange-600" />
                      <Label htmlFor="admin" className="font-normal cursor-pointer flex-1">
                        <span className="font-semibold text-orange-700">Admin</span>
                        <p className="text-xs text-gray-600">Management dashboard</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Google Login Button */}
                <Button onClick={handleGoogleLogin} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" size="lg">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/membership" className="text-purple-600 hover:underline font-semibold">
                    View Plans
                  </Link>
                </div>
              </CardContent>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Create Account</CardTitle>
                <CardDescription>Sign up to get started with StockMarket Pro</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      placeholder="John Doe"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className="border-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="border-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="border-purple-200 focus:border-purple-400"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </form>

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <Button onClick={handleGoogleLogin} variant="outline" className="w-full mt-4 border-purple-200 hover:bg-purple-50">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md py-6">
        <div className="container text-center text-sm text-white">
          <p>&copy; 2025 StockMarket Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}