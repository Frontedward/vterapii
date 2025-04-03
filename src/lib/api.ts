import { authService } from '@/services/auth'

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = authService.getToken()
  
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error('API request failed')
  }

  return response.json()
}

export function getApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
  return `${baseUrl}${path}`
} 