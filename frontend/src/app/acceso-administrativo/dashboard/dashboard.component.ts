import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NuevaFichaComponent } from './nueva-ficha/nueva-ficha.component';
import { TurnoAdminComponent } from './turno-admin/turno-admin.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NuevaFichaComponent, TurnoAdminComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardAdministrativoComponent implements OnInit {

  constructor(
    private router: Router
  ){}
  
  ngOnInit(): void {
    
  }

  nuevaFicha(){
    this.router.navigate(['nuevo-admin'])
  }
  nuevoTurno(){
    this.router.navigate(['/turno-admin'])
  }
}