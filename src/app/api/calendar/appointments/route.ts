import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, timeSlotId } = body

    // В реальном приложении здесь будет создание записи в базе данных
    const appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date,
      timeSlot: {
        id: timeSlotId,
        startTime: new Date(date).toISOString(),
        endTime: new Date(new Date(date).getTime() + 30 * 60000).toISOString(),
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(appointment)
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при создании записи' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Требуется ID записи' },
        { status: 400 }
      )
    }

    // В реальном приложении здесь будет удаление записи из базы данных
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при отмене записи' },
      { status: 500 }
    )
  }
} 