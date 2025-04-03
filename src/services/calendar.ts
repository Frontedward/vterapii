import { WeekSchedule, Appointment } from '@/types/calendar'
import { authService } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const calendarService = {
  async getWeekSchedule(startDate: string, endDate: string): Promise<WeekSchedule> {
    const token = authService.getToken()
    const response = await fetch(
      `${API_URL}/calendar/schedule?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch schedule')
    }

    return response.json()
  },

  async createAppointment(date: string, timeSlotId: string): Promise<Appointment> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/calendar/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, timeSlotId }),
    })

    if (!response.ok) {
      throw new Error('Failed to create appointment')
    }

    return response.json()
  },

  async cancelAppointment(appointmentId: string): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/calendar/appointments/${appointmentId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to cancel appointment')
    }
  },

  async getAppointments(): Promise<Appointment[]> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/calendar/appointments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch appointments')
    }

    return response.json()
  }
} 