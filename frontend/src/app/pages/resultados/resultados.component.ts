import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  guardarIdCliente?: number;

  valorGuardado?: number;
  valorIntroducido?: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.guardarIdCliente = +params['id'];
      console.log(this.guardarIdCliente);
      //otra funcion
    });
  }

  buscarPorCodigo(event: Event) {
    event.preventDefault();
    this.valorGuardado = this.valorIntroducido;
    console.log(this.valorGuardado)
  }
}
