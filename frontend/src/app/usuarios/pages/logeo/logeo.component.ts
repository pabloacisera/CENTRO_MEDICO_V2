import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogeoService } from './logeo.service';
import { Logeo } from './logeo';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logeo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './logeo.component.html',
  styleUrl: './logeo.component.css'
})
export class LogeoComponent {
  datosDeLogeo?: Logeo;

  public formularioDeLogeo: FormGroup;

  constructor( private fb: FormBuilder, private readonly peticion: LogeoService, private route: Router ) {
    this.formularioDeLogeo = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async onSubmit(){
    if(this.formularioDeLogeo.invalid){
      return;
    }
    try {
      const response = await this.peticion.logear(this.formularioDeLogeo.value)
      console.log('Usuario logeado exitosamente', response)
      this.datosDeLogeo = response.data
      this.route.navigate(['/dashboard'])
    } catch (error) {
      console.log('Error al logear usuario', error)
      throw error
    }
  }
}
