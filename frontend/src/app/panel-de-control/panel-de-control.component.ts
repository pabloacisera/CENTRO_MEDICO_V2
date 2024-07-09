import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-de-control',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './panel-de-control.component.html',
  styleUrl: './panel-de-control.component.css'
})
export class PanelDeControlComponent{

  links = [
    { label: "perfil", ruta:"/perfil" },
    { label: "listado", ruta:"/listado" },
    { label: "nuevo", ruta:"/nuevo" },
    { label: "resultado", ruta:"/resultado" },
    { label: "nomenclatura", ruta:"/nomenclatura" },
    { label: "turno", ruta:"/turno" },
  ]

  constructor(private rutas: Router) {}

  navigate(ruta: string){
    this.rutas.navigate([ruta])
  }
}