import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registro } from './registro';
import { RegistrarService } from './registrar.service';
import { catchError, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{

  public datosDeRegistro!: any;

  formularioDeRegistro!: FormGroup;

  constructor(private fb: FormBuilder, private peticion: RegistrarService, private route: Router) { // Se corrigió el constructor y se inicializó correctamente el FormBuilder
    this.formularioDeRegistro = this.fb.group({
      rol: ['', Validators.required],
      area: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)], // Aquí deberías usar Validators.minLength(6) para validar la longitud mínima del campo
    });
  }
  ngOnInit(): void {
    
  }

  async onSubmit() {
    if (this.formularioDeRegistro.valid) {
      const data = this.formularioDeRegistro.value;
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
          console.log('Usuario registrado exitosamente:', response.data);
          // Aquí podrías manejar la respuesta exitosa como lo necesites
        });
      this.route.navigate(['/dashboard'])
    }
  }
}
