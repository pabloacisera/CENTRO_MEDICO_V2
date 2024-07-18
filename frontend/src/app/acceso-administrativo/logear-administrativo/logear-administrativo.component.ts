import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogearService } from '../../logear/logear.service';
import { Router, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { LogearAdministrativoService } from './logear-administrativo.service';

@Component({
  selector: 'app-logear-administrativo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './logear-administrativo.component.html',
  styleUrl: './logear-administrativo.component.css'
})
export class LogearAdministrativoComponent {
  public datosDeLogeo!: any;

  formularioDeLogeo!: FormGroup;

  constructor(private fb: FormBuilder, private peticion: LogearAdministrativoService, private ruta: Router) { // Se corrigió el constructor y se inicializó correctamente el FormBuilder
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
      this.peticion.authAdmin(data)
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
