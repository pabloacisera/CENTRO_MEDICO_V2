import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200', // Permite solicitudes desde este origen
    methods: ['GET', 'POST'],        // Métodos permitidos
    credentials: true                // Permite enviar cookies y headers de autenticación
  }
})
export class NotificacionesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificacionesGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  notificarProfesional(userId: number, mensaje: string) {
    this.server.to(`profesional-${userId}`).emit('notification', mensaje);
  }
}


