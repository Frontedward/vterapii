'use client'

import { useState } from 'react'
import Calendar from '@/components/calendar/Calendar'
import { calendarService } from '@/services/calendar'
import { Appointment } from '@/types/calendar'

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelectTimeSlot = async (date: string, timeSlotId: string) => {
    try {
      setLoading(true)
      setError(null)
      const appointment = await calendarService.createAppointment(date, timeSlotId)
      setAppointments([...appointments, appointment])
    } catch (error) {
      setError('Не удалось записаться на прием. Пожалуйста, попробуйте позже.')
      console.error('Failed to create appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Запись на прием</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Calendar onSelectTimeSlot={handleSelectTimeSlot} />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Ваши записи</h2>
          {appointments.length === 0 ? (
            <p className="text-gray-500">У вас пока нет записей на прием</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {new Date(appointment.date).toLocaleDateString('ru-RU')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.timeSlot.startTime).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Подтверждено' : 'Ожидает подтверждения'}
                    </span>
                  </div>
                  <button
                    onClick={() => calendarService.cancelAppointment(appointment.id)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Отменить запись
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 