
// Definición del tipo Usuario (ajusta según tu estructura real)
export interface Usuario {
  id: number;
  rol: string;
  area: string;
  nombre: string;
  email: string;
  password: string; // Considera no incluir el password en la respuesta
}


export interface AuthenticatedUserResponse {
  user: Usuario;
}
