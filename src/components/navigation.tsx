'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'

const navigationItems = [
  {
    name: 'Главная',
    href: '/',
  },
  {
    name: 'Виртуальный член СД',
    href: '/virtual-director',
  },
  {
    name: 'ВНД Фонда',
    href: '/vnd',
  },
  {
    name: 'НПА Фонда',
    href: '/np',
  },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Image 
              src="/image.png" 
              alt="SKAI Logo" 
              width={120} 
              height={40} 
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation items */}
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[#CEAD6E]'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CEAD6E]"
                        layoutId="activeNavItem"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 w-2 h-2 bg-[#CEAD6E] rounded-full" />
                    </>
                  )}
                </Link>
              )
            })}
          </div>

          {/* User section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Image 
                    src="/image.png" 
                    alt="User Avatar" 
                    width={24} 
                    height={24} 
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">Войти</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}