import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosDeLogeo } from '../interfaz-de-logeo';
import { ServicioDeUsuarioService } from '../../servicios/servicio-de-usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './autenticacion.component.html',
  styleUrl: './autenticacion.component.css'
})
export class AutenticacionComponent implements OnInit {

  formularioDeLogeo: FormGroup;

  constructor(private fb:FormBuilder, private readonly servicio: ServicioDeUsuarioService, private ruta: Router){
    this.formularioDeLogeo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.formularioDeLogeo.invalid){
      console.log('Error en el formulario.Invalido!');
    }
    console.log('Datos para enviarse al servidor: ', this.formularioDeLogeo.value)

    const datosDeLogeo: DatosDeLogeo = this.formularioDeLogeo.value;
    this.servicio.logearUsuario(datosDeLogeo)
      .then((response: DatosDeLogeo)=> {
        console.log('usuario logeado: ', response);
        localStorage.setItem('token', response.token)
        localStorage.setItem('usuario', JSON.stringify(response))
        this.ruta.navigate(['/panel'])
      })
      .catch((error: any)=> {
        console.error('Error al logear: ', error)
      })
  }
}
