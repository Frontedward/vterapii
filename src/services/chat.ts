import { Message, ChatRoom } from '@/types/chat'
import { authService } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000/api/chat/ws'

class ChatService {
  private socket: WebSocket | null = null
  private messageHandlers: ((message: Message) => void)[] = []

  connect() {
    const token = authService.getToken()
    if (!token) return

    this.socket = new WebSocket(`${WS_URL}?token=${token}`)

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.messageHandlers.forEach(handler => handler(message))
    }

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 5000)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler)
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler)
    }
  }

  async getRooms(): Promise<ChatRoom[]> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/chat/rooms`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch chat rooms')
    }

    return response.json()
  }

  async getMessages(roomId: string): Promise<Message[]> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/chat/rooms/${roomId}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch messages')
    }

    return response.json()
  }

  async sendMessage(roomId: string, content: string, attachments?: File[]): Promise<Message> {
    const token = authService.getToken()
    const formData = new FormData()
    formData.append('content', content)
    attachments?.forEach(file => formData.append('attachments', file))

    const response = await fetch(`${API_URL}/chat/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    return response.json()
  }

  async markAsRead(roomId: string): Promise<void> {
    const token = authService.getToken()
    const response = await fetch(`${API_URL}/chat/rooms/${roomId}/read`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to mark messages as read')
    }
  }
}

export const chatService = new ChatService() 