import { Component, OnInit } from '@angular/core';
import { CorreosService } from './correos.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.css']
})
export class CorreosComponent implements OnInit {

  from = '';
  to = '';
  subject = '';
  text = '';
  file: File | null = null;

  constructor(private mailService: CorreosService) { }

  ngOnInit() {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  sendMail() {
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
      })
      .catch(error => {
        console.error('Error al enviar el correo: ', error);
      });
  }
}

