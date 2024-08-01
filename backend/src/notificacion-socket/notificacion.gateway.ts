import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        credentials: true
    }
})
export class NotificacionGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log('Socket conectado', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Socket desconectado');
    }

    @SubscribeMessage('nombre-paciente')
    handleNombrePaciente(
        @MessageBody() nombre: string
    ): void {
        console.log('Nombre del paciente: ', nombre);
        this.server.emit('mensaje-event', `${nombre}`);
    }
}
