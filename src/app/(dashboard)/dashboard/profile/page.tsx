'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Имя</label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              ) : (
                <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Роль</label>
              <p className="mt-1 text-sm text-gray-900">
                {user?.role === 'doctor' ? 'Врач' : 'Пациент'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Выйти
            </button>
          </div>
        </div>
        
        {user?.role === 'patient' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">История приёмов</h2>
            <p className="text-sm text-gray-500">История приёмов пока пуста</p>
          </div>
        )}
      </div>
    </div>
  )
} 