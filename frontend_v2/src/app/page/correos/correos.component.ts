import { Component, OnInit } from '@angular/core';
import { CorreosService } from './correos.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.css']
})
export class CorreosComponent implements OnInit {

  from: string = 'software.medilink.business@gmail.com';
  to = '';
  subject = '';
  text = '';
  file: File | null = null;
  public isLoading = false;

  public message: string | null = null;

  constructor(private mailService: CorreosService,
    private route: Router
  ) { }

  ngOnInit() {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  sendMail() {
    this.isLoading = true
    const formData = new FormData();
    formData.append('from', this.from);
    formData.append('to', this.to);
    formData.append('subject', this.subject);
    formData.append('text', this.text);
    if (this.file) {
      formData.append('file', this.file, this.file.name);
    }

    this.mailService.sendMail(formData)
      .then(response => {
        console.log('Correo enviado: ', response);
        this.message = 'El correo se ha enviado correctamente.';
      })
      .catch(error => {
        console.error('Error al enviar el correo: ', error);
        this.message = 'No se ha podido enviar el correo.';
      })
      .finally(() => {
        this.isLoading = false
        setTimeout(() => {
          this.message = null;
          this.route.navigate(['/dash-prof'])
        }, 3000);
      })
  }
}

