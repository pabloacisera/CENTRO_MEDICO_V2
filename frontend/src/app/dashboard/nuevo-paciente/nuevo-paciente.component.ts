import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NuevoPacienteService } from './nuevo-paciente.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nuevo-paciente',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-paciente.component.html',
  styleUrl: './nuevo-paciente.component.css'
})
export class NuevoPacienteComponent implements OnInit {
  clienteForm: FormGroup;
  userId: number | undefined;
  opcionesSeguridadSocial = ['IAPOS', 'Pami', 'OSECAC', 'OSPRERA', 'Otras'];

  constructor(
    private fb: FormBuilder,
    private service: NuevoPacienteService,
    private router: Router
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
      const userDataObj = JSON.parse(userData);
      this.userId = userDataObj.id;
      this.clienteForm.patchValue({ userId: this.userId });
    }
  }

  async submitForm() {
    if (this.clienteForm.valid) {
      try {
        const clienteCreado = await this.service.nuevoCliente(this.clienteForm.value);
        console.log('Cliente creado:', clienteCreado);
        this.router.navigate(['/listado']);
      } catch (error) {
        console.error('Error al crear cliente:', error);
      }
    } else {
      throw new Error('El formulario no es válido');
    }
  }

  calcularEdad() {
    const fechaNacimiento = this.clienteForm.get('nacimiento')?.value;

    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();

      // Ajuste por si todavía no ha sido el cumpleaños este año
      if (hoy < new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())) {
        edad--;
      }

      this.clienteForm.patchValue({ edad: edad });
    }
  }
}