import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrarService } from '../registrar/registrar.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-acceso-administrativo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './acceso-administrativo.component.html',
  styleUrl: './acceso-administrativo.component.css'
})
export class AccesoAdministrativoComponent {
  public datosDeRegistro!: any;

  formularioDeRegistro!: FormGroup;

  constructor(private fb: FormBuilder, private peticion: RegistrarService, private route: Router) { // 
    this.formularioDeRegistro = this.fb.group({
      rol: ['', Validators.required],
      area: [''],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)], 
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
          this.route.navigate(['/dashboard-administrativo'])
          // Aquí podrías manejar la respuesta exitosa como lo necesites
        });
      
    }
  }
}


