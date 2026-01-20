'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Target, Eye, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StockMarket Pro</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-primary">
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
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="text-xl text-muted-foreground">
            Empowering traders with cutting-edge technology and real-time market insights
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Target className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To democratize access to professional-grade stock market tools and data, enabling every trader to make informed decisions with confidence.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Eye className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To become the world's most trusted platform for stock market analysis and trading, powered by innovation and transparency.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2025, StockMarket Pro was born from a simple belief: everyone deserves access to professional-grade trading tools, not just Wall Street insiders.
              </p>
              <p>
                Our team of experienced traders, developers, and financial analysts came together with a shared vision—to create a platform that combines powerful technology with user-friendly design.
              </p>
              <p>
                Today, we serve thousands of traders worldwide, providing real-time data, advanced analytics, and the tools needed to succeed in today's fast-paced markets.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground">The principles that guide everything we do</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We strive for excellence in every feature, every update, and every interaction.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We believe in open, honest communication with our users and partners.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We continuously innovate to stay ahead of market needs and expectations.
              </p>
            </CardContent>
          </Card>
        </div>
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