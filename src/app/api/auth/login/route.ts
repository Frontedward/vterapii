import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Захардкоженный пользователь для тестирования
const DEFAULT_USER = {
  email: 'e.shabronsky@gmail.com',
  password: '12345',
  id: '1',
  name: 'Эд',
  role: 'patient'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Проверяем учетные данные
    if (body.email === DEFAULT_USER.email && body.password === DEFAULT_USER.password) {
      return NextResponse.json({
        token: 'fake-token-for-testing',
        user: {
          id: DEFAULT_USER.id,
          email: DEFAULT_USER.email,
          name: DEFAULT_USER.name,
          role: DEFAULT_USER.role
        }
      })
    }
    
    // Если данные неверные
    return NextResponse.json(
      { error: 'Неверный email или пароль' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при входе' },
      { status: 400 }
    )
  }
} 