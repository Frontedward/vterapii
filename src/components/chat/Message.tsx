import { Message as MessageType } from '@/types/chat'
import { useAuth } from '@/hooks/useAuth'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface MessageProps {
  message: MessageType
}

export default function Message({ message }: MessageProps) {
  const { user } = useAuth()
  const isOwnMessage = message.senderId === user?.id

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        <div className="text-sm">{message.content}</div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center space-x-2">
                {attachment.type === 'image' ? (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="max-w-xs rounded-lg"
                  />
                ) : (
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline"
                  >
                    {attachment.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
        <div
          className={`text-xs mt-1 ${
            isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          }`}
        >
          {format(new Date(message.createdAt), 'HH:mm', { locale: ru })}
        </div>
      </div>
    </div>
  )
} 