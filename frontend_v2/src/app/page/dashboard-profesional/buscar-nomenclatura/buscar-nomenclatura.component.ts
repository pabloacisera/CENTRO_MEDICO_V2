import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NomenclaturaService } from './nomenclatura.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FiltroDeterminacionPipe } from '../../../filtro-determinacion.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nomenclatura',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, RouterLink, FiltroDeterminacionPipe],
  templateUrl: './buscar-nomenclatura.component.html',
  styleUrl: './buscar-nomenclatura.component.css'
})
export class BuscarNomenclaturaComponent implements OnInit {

  nomenclaturaCompleta: any[] = [];
  filtroDeBusqueda: any = {busquedaDeterminacion: ''}
  p: number = 1;
 

  constructor(private readonly peticion: NomenclaturaService) { }

  ngOnInit(): void {
    this.traerNomenclatura();
  }

  async traerNomenclatura() {
    try {
      const response = await this.peticion.traerTodos();
      this.nomenclaturaCompleta = response;
      console.log('Datos del backend: ', this.nomenclaturaCompleta); 
    } catch (error) {
      console.error('Error al obtener nomenclatura', error);
    }
  }  
}