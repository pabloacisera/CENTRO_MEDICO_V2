import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from './registro.service';
import { Registro } from './registro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formularioDeRegistro: FormGroup;
  datosDelUsuario?: Registro;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private route:Router) {
    this.formularioDeRegistro = this.fb.group({
      rol: ['', Validators.required],
      area: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    try {
      if (this.formularioDeRegistro.valid) {
        console.log(this.formularioDeRegistro.value);
        const res = await this.registroService.crearUsuario(this.formularioDeRegistro.value);
        console.log('Usuario creado exitosamente:', res);
        this.datosDelUsuario = res;
        this.route.navigate(['/logear'])
      } else {
        console.error('El formulario no es válido');
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  }
}
