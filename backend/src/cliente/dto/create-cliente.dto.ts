export class CreateClienteDto {
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
  obs?: string;
  userId: number;
}
