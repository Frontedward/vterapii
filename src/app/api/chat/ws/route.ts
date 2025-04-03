import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import WebSocket, { WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'

let wsServer: WebSocketServer | null = null

if (!wsServer) {
  wsServer = new WebSocketServer({ noServer: true })

  wsServer.on('connection', (socket: WebSocket) => {
    socket.on('message', (data: Buffer) => {
      // Эхо сообщения обратно всем клиентам
      wsServer?.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString())
        }
      })
    })
  })
}

export function GET(req: NextRequest) {
  const { socket, response } = Reflect.get(req, 'socket')

  if (!socket) {
    return new NextResponse('WebSocket только', { status: 400 })
  }

  wsServer?.handleUpgrade(req as unknown as IncomingMessage, socket, Buffer.from(''), (ws: WebSocket) => {
    wsServer?.emit('connection', ws, req)
  })

  return response
} 