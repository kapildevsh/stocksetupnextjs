'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { TrendingUp, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const plans = [
  {
    name: 'Guest',
    price: 'Free',
    description: 'Perfect for exploring the platform',
    features: [
      'Limited market data access',
      'Basic stock information',
      'Community forums',
      'Educational resources'
    ],
    buttonText: 'Current Plan',
    disabled: true
  },
  {
    name: 'Subscribe',
    price: '$29',
    period: '/month',
    description: 'For serious traders who need more',
    features: [
      'Real-time market data',
      'Advanced analytics',
      'Unlimited watchlists',
      'Portfolio tracking',
      'Price alerts',
      'Priority support',
      'Export data features'
    ],
    buttonText: 'Subscribe Now',
    popular: true
  },
  {
    name: 'Premium',
    price: '$99',
    period: '/month',
    description: 'For professional traders',
    features: [
      'Everything in Subscribe',
      'Advanced charting tools',
      'Custom indicators',
      'API access',
      'Dedicated account manager',
      'Early access to new features',
      'White-label options'
    ],
    buttonText: 'Go Premium'
  }
]

export default function MembershipPage() {
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
            <Link href="/testimony" className="text-sm font-medium hover:text-primary transition-colors">
              Testimony
            </Link>
            <Link href="/membership" className="text-sm font-medium text-primary">
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
          <h1 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Select the perfect membership plan that fits your trading needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container py-8 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={plan.popular ? 'border-primary shadow-lg relative' : ''}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                  disabled={plan.disabled}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All new users start with Guest access. You can try our Subscribe plan free for 14 days before committing.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
                </p>
              </CardContent>
            </Card>
          </div>
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