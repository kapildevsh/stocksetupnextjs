'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, TrendingUp, BarChart3, LineChart, PieChart, DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Index',
    icon: TrendingUp,
    links: [
      { name: 'Index Mover', href: '/users/index-mover' },
      { name: 'Option Data', href: '/users/option-data' },
      { name: 'Future Data', href: '/users/future-data' }
    ]
  },
  {
    title: 'Stocks',
    icon: BarChart3,
    links: [
      { name: 'Swing Trade', href: '/users/swing-trade' },
      { name: 'Intraday', href: '/users/intraday' },
      { name: 'Option', href: '/users/option' },
      { name: 'Setup', href: '/users/setup' }
    ]
  },
  {
    title: 'FII/DII',
    icon: DollarSign,
    links: [
      { name: 'FII/DII Data', href: '/users/fii-dii' }
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState(['Index', 'Stocks', 'FII/DII'])

  const toggleSection = (title) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <Link href="/users" className="flex items-center gap-2 mb-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            StockMarket Pro
          </span>
        </Link>

        <nav className="space-y-2">
          {menuItems.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSections.includes(section.title)
            
            return (
              <div key={section.title} className="space-y-1">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-purple-600" />
                    <span>{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-6 space-y-1">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-lg transition-colors',
                          pathname === link.href
                            ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium'
                            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}