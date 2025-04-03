import { AuthResponse, LoginData, RegisterData } from '@/types/auth'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Ошибка входа')
    }

    const authData = await response.json()
    return authData
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Ошибка регистрации')
    }

    const authData = await response.json()
    return authData
  },

  async logout(): Promise<void> {
    Cookies.remove('token')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  getToken() {
    return Cookies.get('token')
  },

  setAuthData(data: AuthResponse) {
    Cookies.set('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
  }
} 