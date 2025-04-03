import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Временные данные для тестирования
const MOCK_ROOMS = [
  {
    id: '1',
    name: 'Общий чат',
    participants: [
      {
        id: 'doctor1',
        name: 'Доктор Иванов',
        role: 'doctor'
      }
    ],
    lastMessage: {
      id: '1',
      content: 'Добро пожаловать!',
      sender: {
        id: 'system',
        name: 'Система'
      },
      createdAt: new Date().toISOString()
    },
    unreadCount: 0
  }
]

export async function GET(request: NextRequest) {
  try {
    // В реальном приложении здесь будет получение комнат из базы данных
    return NextResponse.json(MOCK_ROOMS)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении списка комнат' },
      { status: 500 }
    )
  }
} 