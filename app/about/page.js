'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Target, Eye, Award, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">StockMarket Pro</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-sm font-medium text-purple-600">
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
      <section className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">Our Story</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">About Us</h1>
          <p className="text-xl text-gray-600">
            Empowering traders with cutting-edge technology and real-time market insights
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-xl hover:scale-105 transition-transform overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-700"></div>
            <CardHeader>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-700 w-fit p-3 rounded-lg mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To democratize access to professional-grade stock market tools and data, enabling every trader to make informed decisions with confidence.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-xl hover:scale-105 transition-transform overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-700"></div>
            <CardHeader>
              <div className="bg-gradient-to-r from-purple-500 to-pink-700 w-fit p-3 rounded-lg mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To become the world's most trusted platform for stock market analysis and trading, powered by innovation and transparency.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-red-600"></div>
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600 pt-6">
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Our Values</h2>
          <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg hover:scale-105 transition-transform overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-700"></div>
            <CardHeader>
              <div className="bg-gradient-to-r from-green-500 to-emerald-700 w-fit p-3 rounded-lg mb-3">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                We strive for excellence in every feature, every update, and every interaction.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:scale-105 transition-transform overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-700"></div>
            <CardHeader>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-700 w-fit p-3 rounded-lg mb-3">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                We believe in open, honest communication with our users and partners.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:scale-105 transition-transform overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-700"></div>
            <CardHeader>
              <div className="bg-gradient-to-r from-purple-500 to-pink-700 w-fit p-3 rounded-lg mb-3">
                <Award className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                We continuously innovate to stay ahead of market needs and expectations.
              </p>
            </CardContent>
          </Card>
        </div>
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