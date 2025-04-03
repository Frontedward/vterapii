import { User } from './auth'

export interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  isRead: boolean
  attachments?: Attachment[]
}

export interface Attachment {
  id: string
  type: 'image' | 'file' | 'document'
  url: string
  name: string
  size: number
}

export interface ChatRoom {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface ChatState {
  rooms: ChatRoom[]
  currentRoom: ChatRoom | null
  messages: Message[]
  loading: boolean
  error: string | null
} 