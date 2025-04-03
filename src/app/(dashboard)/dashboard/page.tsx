'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Добро пожаловать, {user?.name}!
          </h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Выберите действие:</p>
          </div>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/dashboard/chat"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
              >
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Чат с врачом</p>
                  <p className="text-sm text-gray-500">Начать общение</p>
                </div>
              </Link>

              <Link
                href="/dashboard/calendar"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
              >
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Записаться на приём</p>
                  <p className="text-sm text-gray-500">Выбрать удобное время</p>
                </div>
              </Link>

              <Link
                href="/dashboard/profile"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
              >
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Личный кабинет</p>
                  <p className="text-sm text-gray-500">Управление профилем</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 