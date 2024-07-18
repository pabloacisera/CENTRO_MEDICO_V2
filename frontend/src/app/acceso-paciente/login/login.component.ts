import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public datosDeLogeo!: any;

  formularioDeLogeo!: FormGroup;

  constructor(private fb: FormBuilder, private peticion: LoginService, private ruta: Router) { // Se corrigió el constructor y se inicializó correctamente el FormBuilder
    this.formularioDeLogeo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required], 
    });
  }
  ngOnInit(): void {

  }

  async onSubmit() {
    if (this.formularioDeLogeo.valid) {
      const data = this.formularioDeLogeo.value;
      console.log('Datos de inicio de sesión:', data); // Verifica qué datos se están enviando
  
      try {
        const response = await this.peticion.ingreso(data);
        console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor
  
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        this.ruta.navigate(['/dashboard-paciente'])
        // Redirecciona o realiza otra acción después del inicio de sesión exitoso
      } catch (error) {
        console.error('Error al intentar ingresar a la sección pacientes:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  }
}
