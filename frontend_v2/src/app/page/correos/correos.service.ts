import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environment/development';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  urlSendMail = environment.mailServiceUrl;

  constructor() { }

  sendMail(formData: FormData) {
    return axios.post(`${this.urlSendMail}/send`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}


