import { Component } from '@angular/core';
import { SistemaTurnosService } from './sistema-turnos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Turnos } from './turnos';

export interface Usuario {
  id: number;
  nombre: string;
}

export interface Cliente {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-sistema-turnos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './sistema-turnos.component.html',
  styleUrl: './sistema-turnos.component.css'
})
export class SistemaTurnosComponent {
  turnos: Turnos[] = [];
  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  mensaje: string = '';
  sugerencias: string[] = [];

  constructor(private turnosService: SistemaTurnosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerClientes();
    this.obtenerTurnos();
  }

  crearTurno(fechaStr: string, clienteIdStr: string, userIdStr: string): void {
    const fecha = new Date(fechaStr);
    const clienteId = parseInt(clienteIdStr, 10);
    const userId = parseInt(userIdStr, 10);

    const fechaISO = fecha.toISOString(); // Convertir a cadena en formato ISO
    const nuevoTurno: Turnos = {
      fecha: fechaISO,
      clienteId: clienteId,
      userId: userId
    };

    this.turnosService.crearTurno(nuevoTurno).subscribe(
      response => {
        this.mensaje = 'Turno creado con éxito';
        console.log('Message exitous: ', this.mensaje);
        this.obtenerTurnos();
      },
      error => {
        if (error.status === 409) { // Conflict
          this.mensaje = 'Turno no disponible';
          console.log('Message: ', this.mensaje);
          this.sugerencias = error.error.sugerencias || [];
          console.log('sugerencias: ', this.sugerencias);
        } else {
          this.mensaje = 'Error al crear el turno';
        }
      }
    );
  }

  obtenerTurnos(): void {
    this.turnosService.obtenerTurno().subscribe(
      (turnos: Turnos[]) => {
        this.turnos = turnos.map(turno => ({
          ...turno,
          fecha: this.formatearFecha(turno.fecha)
        }));
        console.log('Turnos creados: ', this.turnos);
      },
      error => {
        console.error('Error al obtener turnos', error);
      }
    );
  }

  obtenerUsuarios(): void {
    this.turnosService.obtenerUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        console.log('usuarios obtenidos: ', this.usuarios);
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  obtenerClientes(): void {
    this.turnosService.obtenerClientes().subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
        console.log('clientes obtenidos: ', this.clientes);
      },
      error => {
        console.log('Error al obtener clientes', error);
      }
    );
  }

  // Estos métodos se pueden eliminar si no se utilizan en otro lugar
  getClienteNombre(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nombre : 'Desconocido';
  }

  getUsuarioNombre(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nombre : 'Desconocido';
  }

  formatearFecha(fechaStr: string): string {
    const date = new Date(fechaStr);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return date.toLocaleString('es-ES', options);
  }
}