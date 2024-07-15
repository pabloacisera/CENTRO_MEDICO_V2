import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from './perfil.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  userId!: number;
  datosDeUsuario: any[] = [];

  public ruta = inject(Router)

  constructor(private readonly peticion: PerfilService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
      this.obtenerDatosDeUsuario(this.userId)
    }
  }

  async obtenerDatosDeUsuario(userId: number){
    this.peticion.obtenerUsuarioById(userId)
    .then((response)=> {
      if (Array.isArray(response)) {
        this.datosDeUsuario = response;
      } else {
        this.datosDeUsuario = [response]; // Convertir objeto a array con un solo elemento
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  funcionSalir() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token')
    this.ruta.navigate(['/logear'])
  }
}
