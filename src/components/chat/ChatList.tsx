import { ChatRoom } from '@/types/chat'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface ChatListProps {
  rooms: ChatRoom[]
  currentRoomId: string | null
  onSelectRoom: (roomId: string) => void
}

export default function ChatList({ rooms, currentRoomId, onSelectRoom }: ChatListProps) {
  return (
    <div className="w-80 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Чаты</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {rooms.map((room) => {
            const otherParticipant = room.participants[0]
            const isActive = room.id === currentRoomId

            return (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 ${
                  isActive ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">
                      {otherParticipant.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {otherParticipant.name}
                    </p>
                    {room.lastMessage && (
                      <p className="text-xs text-gray-500">
                        {format(new Date(room.lastMessage.createdAt), 'HH:mm', {
                          locale: ru,
                        })}
                      </p>
                    )}
                  </div>
                  {room.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {room.lastMessage.content}
                    </p>
                  )}
                  {room.unreadCount > 0 && (
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {room.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
} 