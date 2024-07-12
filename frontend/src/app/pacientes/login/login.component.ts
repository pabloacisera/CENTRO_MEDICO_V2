import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoPaciente } from './interface.acceso.paciente';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  datosDePaciente: any[] = [];

  datosPaciente: FormGroup;

  constructor(private fb:FormBuilder, private servicio: LoginService) {
    this.datosPaciente = this.fb.group({
      email: ['', Validators.required],
      dni: ['', Validators.required],
    })
  }

  accederAlSistema(){
    if(this.datosPaciente.invalid) {
      console.log('Error en el formulario');
      return; // Añadir esta línea
    }
  
    let data: AccesoPaciente = this.datosPaciente.value //data se envia por servicio
    console.log(data);
    this.servicio.accesoCliente(data)
      .then((res)=>{
        localStorage.setItem('token', res.token); // Cambiar res.data.token a res.token
        this.datosDePaciente = res.data;
        console.log(this.datosDePaciente)
      })
      .catch((error) => {
        console.error('Error al acceder al sistema', error);
      });
  }
  

}
