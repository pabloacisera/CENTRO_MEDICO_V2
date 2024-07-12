import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../nuevo-cliente/cliente';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
})
export class ListadoComponent implements OnInit {
  private peticion = inject(ClienteService);
  private ruta = inject(Router);
  public idObtenido?: number;
  clientesGuardados: any[] = [];
  public cargando: boolean = false;

  ngOnInit(): void {  
    this.obtenerIdUsuario().then((id) => {
      this.obtenerclientes(id);
    });
  }

  private async obtenerIdUsuario(): Promise<number> {
    const obtenerIdUsuario = localStorage.getItem('usuario');
    if (obtenerIdUsuario) {
      try {
        const usuario = JSON.parse(obtenerIdUsuario);
        return usuario.data.id;
      } catch (error) {
        console.error('Error al parsear el usuario de localStorage', error);
        return 0; // o algún otro valor por defecto
      }
    } else {
      console.error('No se encontró usuario en localStorage');
      return 0; // o algún otro valor por defecto
    }
  }

  async obtenerclientes(idObtenido: number) {
    try {
      this.cargando= true;
      const enviarPeticion: { data: any } =
        await this.peticion.obtenerTodosLosClientes(idObtenido);
      console.log(enviarPeticion);
      this.clientesGuardados = enviarPeticion.data;
      console.log(this.clientesGuardados);
      this.cargando= false;
      return enviarPeticion;
    } catch (error) {
      console.error('Errro el enviar datos: ', error);
      throw new Error();
      this.cargando= false;
    }
  }

  mostrarId(id:number) {
    const idCliente = id;
    this.ruta.navigate([`/ver/${idCliente}`])
  }

  async borrar(idCliente: number) {
    try {
      await this.peticion.borrarUnCliente(idCliente);
      this.obtenerclientes(await this.obtenerIdUsuario());
    } catch (error) {
      console.log('No se ha podido borrar el cliente');
      throw new Error();
    }
  }

  idParaActualizarCliente(id: number) {
    const idCliente = id;
    this.ruta.navigate([`/actualizar/${idCliente}`])
  }

  idClienteParaResultados(id: number) {
    const idCliente = id;
    this.ruta.navigate([`/resultado/${idCliente}`])
    console.log('Id de cliente: ', idCliente)
  }
}
