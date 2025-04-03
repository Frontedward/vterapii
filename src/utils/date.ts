import { format, formatDistance } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDate = (date: Date | string) => {
  return format(new Date(date), 'dd.MM.yyyy', { locale: ru })
}

export const formatTime = (date: Date | string) => {
  return format(new Date(date), 'HH:mm', { locale: ru })
}

export const formatDateTime = (date: Date | string) => {
  return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru })
}

export const formatRelativeTime = (date: Date | string) => {
  return formatDistance(new Date(date), new Date(), { 
    locale: ru,
    addSuffix: true 
  })
} 