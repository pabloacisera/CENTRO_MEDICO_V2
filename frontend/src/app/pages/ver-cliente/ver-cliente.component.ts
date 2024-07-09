import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-cliente.component.html',
  styleUrl: './ver-cliente.component.css'
})
export class VerClienteComponent implements OnInit{

  public cargando: boolean = false;

  public unCliente: any = null;

  idClienteObtenido?: number;

  constructor(private route: ActivatedRoute, private servicio: ClienteService) {}

  ngOnInit(): void {
    this.idExtraido();
  }

  idExtraido() {
    this.route.params.subscribe(params => {
      this.idClienteObtenido = +params['id'];
      this.obtenerCliente(this.idClienteObtenido);
    });
  }

  async obtenerCliente(idClienteObtenido: number) {
    this.cargando = true;
    try {
      this.unCliente = await this.servicio.obtenerUnId(idClienteObtenido);
      this.cargando = false;
    } catch (error) {
      console.error('No se ha podido obtener el cliente:', error);
      this.cargando = false;
    }
  }
}
