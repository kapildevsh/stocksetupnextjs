'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, TrendingUp, Shield, Users, BarChart3, Bell, Zap, Sparkles, LineChart, Award } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">StockMarket Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/testimony" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Testimony
            </Link>
            <Link href="/membership" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Membership
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Welcome to the Future of Trading</span>
          </div>
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Your Gateway to
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> Smart Trading</span>
            </h1>
            <p className="text-xl text-gray-600">
              Real-time market data, advanced analytics, and powerful tools to make informed investment decisions.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8">
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/membership">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-purple-200 hover:bg-purple-50">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Why Choose Us?</h2>
          <p className="text-gray-600 text-lg">Everything you need to succeed in the stock market</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:scale-105 transition-transform">
            <CardHeader>
              <div className="bg-white/20 w-fit p-3 rounded-lg mb-3">
                <BarChart3 className="h-8 w-8" />
              </div>
              <CardTitle className="text-white text-xl">Real-Time Data</CardTitle>
              <CardDescription className="text-purple-100">
                Access live stock prices and market data updated in real-time
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:scale-105 transition-transform">
            <CardHeader>
              <div className="bg-white/20 w-fit p-3 rounded-lg mb-3">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-white text-xl">Secure Platform</CardTitle>
              <CardDescription className="text-blue-100">
                Bank-level security to keep your data and investments safe
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-rose-700 text-white hover:scale-105 transition-transform">
            <CardHeader>
              <div className="bg-white/20 w-fit p-3 rounded-lg mb-3">
                <Zap className="h-8 w-8" />
              </div>
              <CardTitle className="text-white text-xl">Lightning Fast</CardTitle>
              <CardDescription className="text-pink-100">
                Execute trades and analyze data with blazing fast performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-400 to-emerald-600 text-white">
            <CardContent className="p-8 text-center">
              <LineChart className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-green-100">Active Traders</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-400 to-red-600 text-white">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-orange-100">User Rating</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-cyan-100">Satisfaction Rate</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">Ready to Start Trading?</h3>
              <p className="text-purple-100 text-lg">Join thousands of traders already using our platform</p>
            </div>
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
                Sign Up Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-md py-8 mt-16">
        <div className="container text-center text-sm text-gray-600">
          <p>&copy; 2025 StockMarket Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}