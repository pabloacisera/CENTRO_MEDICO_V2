import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from './nuevoCliente';
import { ClienteService } from './nuevoCliente.service';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent implements OnInit {
  userId: number = 0;
  clienteFormulario?: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteFormulario = this.fb.group({
      protocolo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      nacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      seguridadSocial: ['', [Validators.required]],
      obs: [''],
      userId: ['', [Validators.required]],
    });
    this.obtenerIdDeStorage();
  }

  obtenerIdDeStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const data = JSON.parse(userData);
        if (data && typeof data.id === 'number') {
          this.userId = data.id;
        } else {
          console.error('El objeto userData no tiene una propiedad id válida.');
        }
      } catch (e) {
        console.error('Error al parsear userData:', e);
      }
    } else {
      console.error('No se encontró userData en localStorage.');
    }
  }

  async onSubmit(): Promise<void> {
    if (this.clienteFormulario && this.clienteFormulario.valid) {
      const cliente: Cliente = {
        ...this.clienteFormulario.value,
        userId: this.userId,
      };
      console.log('Datos para enviar: ', cliente);
      try {
        const response = await this.clienteService.createCliente(cliente);
        console.log('Cliente creado:', response);
        // Aquí puedes manejar la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error al crear cliente:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      }
    } else {
      console.error('El formulario no es válido.');
    }
  }
}