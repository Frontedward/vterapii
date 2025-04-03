import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Временные данные для тестирования
const MOCK_MESSAGES = [
  {
    id: '1',
    content: 'Добро пожаловать в чат!',
    sender: {
      id: 'system',
      name: 'Система'
    },
    createdAt: new Date().toISOString(),
    read: true
  }
]

export async function GET(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    // В реальном приложении здесь будет получение сообщений из базы данных
    return NextResponse.json(MOCK_MESSAGES)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении сообщений' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const formData = await request.formData()
    const content = formData.get('content') as string
    
    // В реальном приложении здесь будет сохранение сообщения в базе данных
    const message = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      sender: {
        id: '1',
        name: 'Пользователь'
      },
      createdAt: new Date().toISOString(),
      read: false
    }

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при отправке сообщения' },
      { status: 500 }
    )
  }
} 