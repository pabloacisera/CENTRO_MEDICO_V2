// src/app/models/cliente.model.ts
export interface Cliente {
  id?: number; // Opcional porque puede no estar presente en el formulario de creación
  protocolo: number;
  nombre: string;
  dni: string;
  nacimiento: Date;
  edad: number;
  direccion: string;
  localidad: string;
  telefono: string;
  email: string;
  seguridadSocial: string;
  obs?: string; // Opcional
  userId: number;
  createdAt?: Date; // Opcional porque puede no estar presente en el formulario de creación
}
