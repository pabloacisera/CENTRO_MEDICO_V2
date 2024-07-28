import { Component, OnInit } from '@angular/core';
import { ImapflowBandejaCorreosService } from './imapflow-bandeja-correos.service';
import axios from 'axios';

export interface Email {
  uid: number;
  subject: string;
  from: string;
  date: string;
  // Agrega otros campos según sea necesario
}


@Component({
  selector: 'app-imapflow-bandeja-correos',
  templateUrl: './imapflow-bandeja-correos.component.html',
  styleUrls: ['./imapflow-bandeja-correos.component.css']
})

export class ImapflowBandejaCorreosComponent implements OnInit {

  emails: Email[] = [];

  constructor(
    private readonly service: ImapflowBandejaCorreosService
  ) { }

  ngOnInit(): void {
    this.getEmails();
  }

  async getEmails() {
    try {
      const data = await this.service.fetchEmails();
      console.log('Respuesta del ts: ', data);
      if (data && data.emails) {
        this.emails = data.emails;
      } else {
        console.warn('No se encontraron correos en la respuesta.');
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  }  
}

