import { Component, inject, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  usuarioGuardado: any[] = [];

  private servicioPerfil = inject(PerfilService)
  private ruta = inject(Router)

  ngOnInit(): void {
    this.guardarDatos();
  }

  guardarDatos(){
    this.usuarioGuardado = this.servicioPerfil.DatosExtraidos;
    console.log('Datos obtenidos del servicio: ', this.usuarioGuardado)
  }

  salir(){
    this.servicioPerfil.funcionSalir();
    this.ruta.navigate(['/'])
  }
}
