import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Registro } from './registro';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit{

  formularioDeRegistro!: FormGroup;

  constructor(private fb: FormBuilder) { // Se corrigió el constructor y se inicializó correctamente el FormBuilder
    this.formularioDeRegistro = this.fb.group({
      rol: ['', Validators.required],
      area: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)], // Aquí deberías usar Validators.minLength(6) para validar la longitud mínima del campo
    });
  }
  ngOnInit(): void {
    
  }

  onSubmit(){
    if(this.formularioDeRegistro?.valid){
      let data = {
        ...this.formularioDeRegistro.value
      }
      console.log(data)
    }   
  }
}
