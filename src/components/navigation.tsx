'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const items = [
  { name: 'Главная', href: '/' },
  { name: 'Виртуальный член СД', href: '/virtual-director' },
  { name: 'ВНД Фонда', href: '/vnd' },
  { name: 'НПА Фонда', href: '/np' },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isActive = (href: string) => pathname === href

  return (
    <nav className="w-full">
      {/* height & padding get a touch smaller on mobile */}
      <div className="mx-auto flex h-10 sm:h-11 md:h-12 w-full max-w-[min(1200px,92vw)] items-center justify-between px-0">
        {/* ЛОГО (чуть меньше на мобиле) */}
        <div className="flex items-center">
          <Image
            src="/image.png"
            alt="SKAI Logo"
            width={124}
            height={32}
            className="w-20 h-auto sm:w-24 md:w-28 max-[834px]:w-24 lg:h-24 md:h-10 object-contain"
            priority
          />
        </div>

        {/* ЛИНЕЙНАЯ НАВИГАЦИЯ — всегда видна; размеры и отступы ужимаются на узких экранах */}
        <div className="flex items-center">
          <nav className="flex items-center gap-3 sm:gap-4 md:gap-3 lg:gap-8 max-[834px]:gap-2.5">
            {items.map((it) => {
              const active = isActive(it.href)
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    // shrink font on mobile, normal on desktop
                    'relative text-[12px] sm:text-[13px] md:text-[9px] lg:text-sm transition-colors',
                    active
                      ? 'text-black font-semibold'
                      : 'text-gray-500 hover:text-gray-800'
                  )}
                >
                  {it.name}
                  {active && (
                    <span className="ml-1.5 md:ml-2 inline-block h-1 w-1 md:h-1.5 md:w-1.5 align-middle rounded-full bg-black max-[834px]:hidden" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Правый блок — всегда виден, но компактный на узких экранах */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                <span className="hidden lg:inline text-xs sm:text-sm text-gray-700">
                  {(session.user as any)?.name || 'Профиль'}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="text-xs sm:text-sm max-[834px]:text-[12px] text-gray-900 hover:opacity-80"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-medium text-gray-900">Войти</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}