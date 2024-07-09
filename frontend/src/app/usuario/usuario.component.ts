import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioDeUsuarioService } from '../servicios/servicio-de-usuario.service';
import { InterfazDeUsuario } from './interfaz-de-usuario'; // Ajusta la ruta según sea necesario
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone:true,
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private servicio: ServicioDeUsuarioService, private ruta: Router) {
    this.formulario = this.fb.group({
      rol: ['', Validators.required],
      area: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formulario.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const datosDeUsuario: InterfazDeUsuario = this.formulario.value;
    this.servicio.crearUsuario(datosDeUsuario)
      .then((response: InterfazDeUsuario) => {
        console.log('Usuario creado:', response);//efectivamente el response devolvio los datos que necesito para trabjar en el frontend
        localStorage.setItem('token', response.token);
        localStorage.setItem('usuario', JSON.stringify(response))
        this.ruta.navigate(['/panel'])//agregar ruta a la que se redirige
      })
      .catch((error: any) => {
        console.error('Error al crear usuario:', error);
      });
  }
}
