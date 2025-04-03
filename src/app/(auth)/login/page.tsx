'use client'

import { useState } from 'react'
import AuthForm from '@/components/ui/AuthForm'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { login } = useAuth()
  const [error, setError] = useState('')

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setError('')
      await login(data)
    } catch (err) {
      setError('Ошибка входа. Проверьте email и пароль.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Или{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              зарегистрируйтесь
            </Link>
          </p>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <AuthForm type="login" onSubmit={handleSubmit} />
      </div>
    </div>
  )
} 