'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TrendingUp, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Day Trader',
    avatar: 'SJ',
    rating: 5,
    content: 'StockMarket Pro has completely transformed my trading experience. The real-time data and intuitive interface help me make quick, informed decisions. Highly recommended!'
  },
  {
    name: 'Michael Chen',
    role: 'Investment Analyst',
    avatar: 'MC',
    rating: 5,
    content: 'As a professional analyst, I need reliable data and powerful tools. This platform delivers both. The analytics are top-notch and the platform is incredibly fast.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Retail Investor',
    avatar: 'ER',
    rating: 5,
    content: 'I was new to trading and this platform made everything so easy to understand. The customer support is excellent and the membership plans are very affordable.'
  },
  {
    name: 'David Thompson',
    role: 'Portfolio Manager',
    avatar: 'DT',
    rating: 5,
    content: 'Managing multiple portfolios has never been easier. The dashboard gives me a complete overview and the tools are professional-grade. Worth every penny!'
  },
  {
    name: 'Lisa Wang',
    role: 'Options Trader',
    avatar: 'LW',
    rating: 5,
    content: 'The speed and accuracy of data on this platform is unmatched. I can execute trades with confidence knowing I have the latest market information at my fingertips.'
  },
  {
    name: 'James Brown',
    role: 'Swing Trader',
    avatar: 'JB',
    rating: 5,
    content: 'Been using StockMarket Pro for 6 months now and my trading performance has improved significantly. The platform is reliable, fast, and packed with useful features.'
  }
]

export default function TestimonyPage() {
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
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link href="/testimony" className="text-sm font-medium text-primary">
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
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">What Our Users Say</h1>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it. Here's what traders are saying about StockMarket Pro.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-8">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="container py-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-primary text-primary-foreground max-w-4xl mx-auto">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Join Thousands of Happy Traders</h3>
              <p className="opacity-90">Start your trading journey with StockMarket Pro today</p>
            </div>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Get Started
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