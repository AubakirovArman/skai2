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
    // без fixed/bg/border — позиционирование делает layout
    <nav className="w-full">
      <div className="mx-auto flex h-10 w-full max-w-[min(1200px,92vw)] items-center justify-between px-0">
        {/* ЛОГО слева */}
        <div className="flex items-center">
          <Image
            src="/image.png"
            alt="SKAI Logo"
            width={124}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center align-center space-x-8">
          <nav className="flex items-center gap-8">
            {items.map((it) => {
              const active = pathname === it.href
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "relative text-sm transition-colors",
                    active ? "text-black font-semibold" : "text-gray-500 hover:text-gray-800"
                  )}
                >
                  {it.name}
                  {/* точка вплотную к активному пункту */}
                  {active && (
                    <span className="ml-2 inline-block h-1.5 w-1.5 align-middle rounded-full bg-black" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* ПРАВЫЙ БЛОК — ЛОГИКА КАК БЫЛА (аватар/Войти/Выйти) */}
        <div className="flex items-center space-x-3">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={(session.user as any)?.image || '/image.png'}
                    alt={(session.user as any)?.name || 'User Avatar'}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-cover"
                  />
                </div>
                <span className="hidden sm:inline text-sm text-gray-700">
                  {(session.user as any)?.name || 'Профиль'}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="text-sm text-gray-900 hover:opacity-80"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src="/image.png"
                  alt="User Avatar"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-gray-900">Войти</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}