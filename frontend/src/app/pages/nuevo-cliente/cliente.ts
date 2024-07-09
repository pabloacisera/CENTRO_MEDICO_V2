export interface Cliente {
  id?: number;
  protocolo?: number;
  nombre: string;
  dni: string;
  nacimiento: string;
  edad: number;
  direccion: string;
  localidad: string;
  telefono: string;
  email: string;
  seguridadSocial: string;
  obs?: string;
  userId: number;
  createdAt?: string;
}
