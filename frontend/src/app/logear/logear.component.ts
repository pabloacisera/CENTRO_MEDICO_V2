import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { LogearService } from './logear.service';

@Component({
  selector: 'app-logear',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './logear.component.html',
  styleUrl: './logear.component.css'
})
export class LogearComponent {
  public datosDeLogeo!: any;

  formularioDeLogeo!: FormGroup;

  constructor(private fb: FormBuilder, private peticion: LogearService, private ruta: Router) { // Se corrigió el constructor y se inicializó correctamente el FormBuilder
    this.formularioDeLogeo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)], // Aquí deberías usar Validators.minLength(6) para validar la longitud mínima del campo
    });
  }
  ngOnInit(): void {

  }

  async onSubmit() {
    if (this.formularioDeLogeo.valid) {
      const data = this.formularioDeLogeo.value;
      this.peticion.registrar(data)
        .pipe(
          catchError(error => {
            console.error('Error al registrar usuario:', error);
            throw error; // Lanza el error para ser manejado por el componente
          })
        )
        .subscribe(response => {
          // Guardar token y datos de usuario en localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.data));
          console.log('Usuario logeado exitosamente:', response.data);
          this.ruta.navigate(['/dashboard']);
          // Aquí podrías manejar la respuesta exitosa como lo necesites
        });
    }
  }

}
