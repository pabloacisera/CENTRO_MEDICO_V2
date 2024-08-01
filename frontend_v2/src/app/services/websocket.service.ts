import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: Socket

  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling'], // Puedes especificar los transportes permitidos
    })
  }

  sendNombrePaciente(nombre: string) {
    this.socket.emit('nombre-paciente', nombre)
  }

  mensajeEvent(): Observable<any> {
    return new Observable(observer => {
      // Escuchar el evento 'toastrEvent'
      this.socket.on('mensaje-event', (data) => {
        // Emitir los datos recibidos
        observer.next(data);
      });

      // Manejar la desconexión del socket
      return () => this.socket.off('mensaje-event');
    });
  }
}
