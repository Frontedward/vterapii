export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  isAvailable: boolean
}

export interface Appointment {
  id: string
  date: string
  timeSlot: TimeSlot
  status: 'pending' | 'confirmed' | 'cancelled'
  patientId: string
  doctorId: string
  createdAt: string
  updatedAt: string
}

export interface DaySchedule {
  date: string
  slots: TimeSlot[]
}

export interface WeekSchedule {
  startDate: string
  endDate: string
  days: DaySchedule[]
} 