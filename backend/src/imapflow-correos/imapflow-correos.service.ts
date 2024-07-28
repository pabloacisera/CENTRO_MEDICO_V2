import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ImapFlow } from 'imapflow';

@Injectable()
export class ImapflowCorreosService implements OnModuleInit, OnModuleDestroy {
  private client: ImapFlow;
  private emails: any[] = [];

  constructor() {
    this.client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: 'rgab zkky zsej pgci',
      },
    });
  }

  async onModuleInit() {
    await this.connectAndFetchEmails();
  }

  async onModuleDestroy() {
    await this.client.logout();
  }

  public async connectAndFetchEmails() {
    try {
      await this.client.connect();

      const lock = await this.client.getMailboxLock('INBOX');
      try {
        if (this.client.mailbox && typeof this.client.mailbox !== 'boolean') {
          for await (const msg of this.client.fetch('1:*', { envelope: true })) {
            this.emails.push({
              uid: msg.uid,
              subject: msg.envelope.subject,
              from: msg.envelope.from[0].address,
              date: msg.envelope.date,
            });
          }
        } else {
          console.error('No se pudo seleccionar el buzón de correo.');
        }
      } finally {
        lock.release();
      }
    } catch (err) {
      console.error('Error al conectar o al obtener correos:', err);
    }
  }

  public getEmails() {
    return this.emails;
  }
}
