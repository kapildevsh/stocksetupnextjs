'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, TrendingUp, Shield, Users, BarChart3, Bell, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StockMarket Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link href="/testimony" className="text-sm font-medium hover:text-primary transition-colors">
              Testimony
            </Link>
            <Link href="/membership" className="text-sm font-medium hover:text-primary transition-colors">
              Membership
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Your Gateway to
              <span className="text-primary"> Smart Trading</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Real-time market data, advanced analytics, and powerful tools to make informed investment decisions.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/membership">
              <Button size="lg" variant="outline">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-muted-foreground">Everything you need to succeed in the stock market</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Real-Time Data</CardTitle>
              <CardDescription>
                Access live stock prices and market data updated in real-time
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Secure Platform</CardTitle>
              <CardDescription>
                Bank-level security to keep your data and investments safe
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Execute trades and analyze data with blazing fast performance
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Start Trading?</h3>
              <p className="opacity-90">Join thousands of traders already using our platform</p>
            </div>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; 2025 StockMarket Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}