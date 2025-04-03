'use client'

import { useEffect, useState, useRef } from 'react'
import { ChatRoom, Message as MessageType } from '@/types/chat'
import { chatService } from '@/services/chat'
import ChatList from '@/components/chat/ChatList'
import MessageInput from '@/components/chat/MessageInput'
import MessageComponent from '@/components/chat/Message'

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([])
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadRooms()
    chatService.connect()

    return () => {
      chatService.disconnect()
    }
  }, [])

  useEffect(() => {
    if (currentRoom) {
      loadMessages(currentRoom.id)
      const unsubscribe = chatService.onMessage((message) => {
        if (message.senderId === currentRoom.id || message.receiverId === currentRoom.id) {
          setMessages((prev) => [...prev, message])
        }
      })
      return () => unsubscribe()
    }
  }, [currentRoom])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadRooms = async () => {
    try {
      const rooms = await chatService.getRooms()
      setRooms(rooms)
    } catch (error) {
      console.error('Failed to load rooms:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (roomId: string) => {
    try {
      const messages = await chatService.getMessages(roomId)
      setMessages(messages)
      await chatService.markAsRead(roomId)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleSelectRoom = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId)
    if (room) {
      setCurrentRoom(room)
    }
  }

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!currentRoom) return

    try {
      const message = await chatService.sendMessage(currentRoom.id, content, attachments)
      setMessages((prev) => [...prev, message])
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatList
        rooms={rooms}
        currentRoomId={currentRoom?.id || null}
        onSelectRoom={handleSelectRoom}
      />
      <div className="flex-1 flex flex-col bg-white">
        {currentRoom ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <MessageComponent key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <MessageInput onSend={handleSendMessage} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Выберите чат для начала общения
          </div>
        )}
      </div>
    </div>
  )
} 