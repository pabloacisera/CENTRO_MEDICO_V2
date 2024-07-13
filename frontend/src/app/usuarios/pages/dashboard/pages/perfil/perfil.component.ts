import { Component, OnInit } from '@angular/core';
import { PerfilService } from './perfil.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  idDelUsuario: number = 0;
  datosGuardados: any;
  carga: boolean = false;

  constructor(private peticion: PerfilService, private route: Router) {}

  ngOnInit(): void {
    this.obtenerIdDeStorage();
    if (this.idDelUsuario) {
      this.obtenerUsuario(this.idDelUsuario);
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  obtenerIdDeStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const data = JSON.parse(userData);
        if (data && typeof data.id === 'number') {
          this.idDelUsuario = data.id;
        } else {
          console.error('El objeto userData no tiene una propiedad id válida.');
        }
      } catch (e) {
        console.error('Error al parsear userData:', e);
      }
    } else {
      console.error('No se encontró userData en localStorage.');
    }
  }

  obtenerUsuario(idDelUsuario: number) {
    this.carga=true;
    this.peticion
      .obtenerUsuarioById(idDelUsuario)
      .then((response) => {
        this.datosGuardados = [response];
        console.log(this.datosGuardados);
        this.carga = false
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
        this.carga= false;
      });
  }

  usuarioSalir() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.route.navigate(['']);
  }

  volver(){
    this.route.navigate(['/dashboard'])
  }
}
