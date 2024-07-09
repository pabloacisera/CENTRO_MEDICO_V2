import { Component, OnInit } from '@angular/core';
import { NomenclaturaService } from '../../servicios/nomenclatura.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Item {
  codigo: string;
  determinacion: string;
  unidadBase: string;
}

@Component({
  selector: 'app-nomenclatura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nomenclatura.component.html',
  styleUrls: ['./nomenclatura.component.css']
})
export class NomenclaturaComponent implements OnInit {

  pageSize = 20;
  currentPage = 0;

  paginatedItems: Item[] = [];
  items: Item[] = []; // Initialize items as an empty array
  searchTerm: string = '';

  public carga: boolean = false;

  nomenclaturaGuardada: Item[] = [];

  constructor(private readonly servicio: NomenclaturaService, private fb: FormBuilder ){}

  ngOnInit(): void {
    this.recopilarRegistro();
  }

  async recopilarRegistro(){
    this.carga = true;
    try {
      const data = await this.servicio.obtenerTodosLosRegistros(); 
      this.nomenclaturaGuardada = data;  
      this.items = data; // inicializar items con los datos obtenidos
      this.paginatedItems = this.paginatedData(); // Update paginatedItems
      this.carga = false;
    } catch (error) {
      console.log(error);
      this.carga = false;
    }
  }

  paginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.items.slice(startIndex, endIndex);
  }

  get maxPage() {
    return Math.ceil(this.items.length / this.pageSize) - 1;
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.paginatedItems = this.paginatedData(); // Update paginatedItems
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginatedItems = this.paginatedData(); // Update paginatedItems
    }
  }

  onSearchTermChange(event: any): void {
    this.searchTerm = event.target.value.trim().toLowerCase();
    this.filterData();
  }

  filterData(): void {
    if (this.searchTerm.length >= 4) {
      this.items = this.nomenclaturaGuardada.filter(item => {
        const codigo = item.codigo ? item.codigo.toString().toLowerCase() : '';
        const determinacion = item.determinacion ? item.determinacion.toString().toLowerCase() : '';
        return codigo.includes(this.searchTerm) || determinacion.includes(this.searchTerm);
      });
    } else {
      this.items = this.nomenclaturaGuardada; // restaurar datos originales
    }
    this.currentPage = 0; // resetear página actual
    this.paginatedItems = this.paginatedData(); // Update paginatedItems
  }
}