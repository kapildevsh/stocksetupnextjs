'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { TrendingUp, Check, Sparkles, Crown, Zap } from 'lucide-react'
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
    disabled: true,
    gradient: 'from-gray-400 to-gray-600',
    icon: Sparkles
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
    popular: true,
    gradient: 'from-purple-500 to-blue-600',
    icon: Zap
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
    buttonText: 'Go Premium',
    gradient: 'from-orange-500 to-pink-600',
    icon: Crown
  }
]

export default function MembershipPage() {
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
            <Link href="/testimony" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Testimony
            </Link>
            <Link href="/membership" className="text-sm font-medium text-purple-600">
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
            <span className="text-sm font-medium text-purple-700">Choose Your Plan</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">
            Select the perfect membership plan that fits your trading needs
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container py-8 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card key={index} className={`border-0 shadow-xl hover:scale-105 transition-transform relative overflow-hidden ${
                plan.popular ? 'ring-4 ring-purple-400' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-bold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${plan.gradient}`}></div>
                <CardHeader>
                  <div className={`w-fit p-3 rounded-lg bg-gradient-to-r ${plan.gradient} mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 text-lg">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <div className={`p-1 rounded-full bg-gradient-to-r ${plan.gradient}`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                    }`}
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-pink-50">
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600">
                  All new users start with Guest access. You can try our Subscribe plan free for 14 days before committing.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
                </p>
              </CardContent>
            </Card>
          </div>
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