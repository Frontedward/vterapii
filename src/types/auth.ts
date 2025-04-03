export interface User {
  id: string
  email: string
  name: string
  role: 'patient' | 'doctor'
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  role: 'patient' | 'doctor'
} 