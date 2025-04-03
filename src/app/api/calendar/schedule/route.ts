import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { addDays, format, setHours, setMinutes } from 'date-fns'

// Генерируем временные слоты для тестирования
function generateTimeSlots(date: Date) {
  const slots = []
  const startHour = 9 // Начало рабочего дня
  const endHour = 18 // Конец рабочего дня
  const slotDuration = 30 // Длительность слота в минутах

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const startTime = setMinutes(setHours(date, hour), minute)
      const endTime = setMinutes(setHours(date, hour), minute + slotDuration)
      
      slots.push({
        id: `${format(startTime, 'yyyy-MM-dd-HH-mm')}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAvailable: Math.random() > 0.3 // 70% слотов доступны
      })
    }
  }

  return slots
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Требуются параметры startDate и endDate' },
        { status: 400 }
      )
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = []
    let currentDate = start

    while (currentDate <= end) {
      days.push({
        date: format(currentDate, 'yyyy-MM-dd'),
        slots: generateTimeSlots(currentDate)
      })
      currentDate = addDays(currentDate, 1)
    }

    return NextResponse.json({
      startDate,
      endDate,
      days
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка при получении расписания' },
      { status: 500 }
    )
  }
} 