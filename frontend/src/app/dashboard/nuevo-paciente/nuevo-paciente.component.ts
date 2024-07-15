import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NuevoPacienteService } from './nuevo-paciente.service';

@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent implements OnInit {
  clienteForm: FormGroup;
  userId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private service: NuevoPacienteService
  ) {
    this.clienteForm = this.fb.group({
      protocolo: [''],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      nacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      seguridadSocial: ['', Validators.required],
      obs: [''],
      userId: [this.userId, Validators.required]
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');

    if (userData) {
      // Parsear userData desde JSON
      const userDataObj = JSON.parse(userData);

      // Asignar userId desde userData
      this.userId = userDataObj.id;

      // Actualizar el valor de userId en el formulario
      this.clienteForm.patchValue({ userId: this.userId });
    }
  }

  async submitForm() {
    if (this.clienteForm.valid) {
      try {
        const clienteCreado = await this.service.nuevoCliente(this.clienteForm.value);
        console.log('Cliente creado:', clienteCreado);

      } catch (error) {
        console.error('Error al crear cliente:', error);
      }
    } else {
      throw new Error('El formulario no es valido')
    }
  }
}