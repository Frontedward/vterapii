import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, LoginData, RegisterData } from '@/types/auth'
import { authService } from '@/services/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setUser(user)
    }
    setLoading(false)
  }, [])

  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data)
      authService.setAuthData(response)
      setUser(response.user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data)
      authService.setAuthData(response)
      setUser(response.user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Register error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
} 