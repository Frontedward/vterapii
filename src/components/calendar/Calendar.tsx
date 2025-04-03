'use client'

import { useState, useEffect } from 'react'
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns'
import { ru } from 'date-fns/locale'
import { WeekSchedule, TimeSlot } from '@/types/calendar'
import { calendarService } from '@/services/calendar'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface CalendarProps {
  onSelectTimeSlot: (date: string, timeSlotId: string) => void
}

export default function Calendar({ onSelectTimeSlot }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedule, setSchedule] = useState<WeekSchedule | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSchedule()
  }, [currentDate])

  const loadSchedule = async () => {
    try {
      setLoading(true)
      const startDate = format(startOfWeek(currentDate), 'yyyy-MM-dd')
      const endDate = format(addDays(startOfWeek(currentDate), 6), 'yyyy-MM-dd')
      const weekSchedule = await calendarService.getWeekSchedule(startDate, endDate)
      setSchedule(weekSchedule)
    } catch (error) {
      console.error('Failed to load schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7))
  }

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {format(startOfWeek(currentDate), 'd MMMM', { locale: ru })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {schedule?.days.map((day) => (
          <div key={day.date} className="bg-white">
            <div className={`p-2 text-center ${
              isToday(new Date(day.date)) ? 'bg-primary text-white' : ''
            }`}>
              {format(new Date(day.date), 'EEE', { locale: ru })}
              <div className="text-sm">
                {format(new Date(day.date), 'd', { locale: ru })}
              </div>
            </div>
            <div className="p-2 space-y-1">
              {day.slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => onSelectTimeSlot(day.date, slot.id)}
                  disabled={!slot.isAvailable}
                  className={`w-full text-sm p-1 rounded ${
                    slot.isAvailable
                      ? 'bg-green-100 hover:bg-green-200 text-green-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {format(new Date(slot.startTime), 'HH:mm')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 