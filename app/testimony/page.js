'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TrendingUp, Star, Sparkles } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Day Trader',
    avatar: 'SJ',
    rating: 5,
    content: 'StockMarket Pro has completely transformed my trading experience. The real-time data and intuitive interface help me make quick, informed decisions. Highly recommended!',
    gradient: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Michael Chen',
    role: 'Investment Analyst',
    avatar: 'MC',
    rating: 5,
    content: 'As a professional analyst, I need reliable data and powerful tools. This platform delivers both. The analytics are top-notch and the platform is incredibly fast.',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Retail Investor',
    avatar: 'ER',
    rating: 5,
    content: 'I was new to trading and this platform made everything so easy to understand. The customer support is excellent and the membership plans are very affordable.',
    gradient: 'from-pink-500 to-rose-700'
  },
  {
    name: 'David Thompson',
    role: 'Portfolio Manager',
    avatar: 'DT',
    rating: 5,
    content: 'Managing multiple portfolios has never been easier. The dashboard gives me a complete overview and the tools are professional-grade. Worth every penny!',
    gradient: 'from-green-500 to-emerald-700'
  },
  {
    name: 'Lisa Wang',
    role: 'Options Trader',
    avatar: 'LW',
    rating: 5,
    content: 'The speed and accuracy of data on this platform is unmatched. I can execute trades with confidence knowing I have the latest market information at my fingertips.',
    gradient: 'from-orange-500 to-red-700'
  },
  {
    name: 'James Brown',
    role: 'Swing Trader',
    avatar: 'JB',
    rating: 5,
    content: 'Been using StockMarket Pro for 6 months now and my trading performance has improved significantly. The platform is reliable, fast, and packed with useful features.',
    gradient: 'from-cyan-500 to-blue-700'
  }
]

export default function TestimonyPage() {
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
            <Link href="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Contact Us
            </Link>
            <Link href="/testimony" className="text-sm font-medium text-purple-600">
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
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full border border-purple-200">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">User Stories</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">What Our Users Say</h1>
          <p className="text-xl text-gray-600">
            Don't just take our word for it. Here's what traders are saying about StockMarket Pro.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-8">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-purple-100">Active Users</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-orange-100">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container py-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-xl hover:scale-105 transition-transform overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${testimonial.gradient}`}></div>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`bg-gradient-to-r ${testimonial.gradient} p-3 rounded-full`}>
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white max-w-4xl mx-auto">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-10">
            <div>
              <h3 className="text-3xl font-bold mb-2">Join Thousands of Happy Traders</h3>
              <p className="text-purple-100 text-lg">Start your trading journey with StockMarket Pro today</p>
            </div>
            <Link href="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8">
                Get Started
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