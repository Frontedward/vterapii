import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Добавить реальную логику регистрации
    return NextResponse.json({ 
      token: 'fake-token',
      user: {
        id: '1',
        email: body.email,
        name: body.name,
        role: body.role
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при регистрации' },
      { status: 400 }
    )
  }
} 