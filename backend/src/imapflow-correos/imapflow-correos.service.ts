import { Injectable, Logger } from '@nestjs/common';
import * as Imap from 'node-imap';

@Injectable()
export class ImapService {
  private readonly logger = new Logger(ImapService.name);
  private imap: Imap;

  constructor() {
    const imapOptions: Imap.ImapOptions = {
      user: 'software.medilink.business@gmail.com',
      password: 'rgab zkky zsej pgci',
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    };
    this.imap = new Imap(imapOptions);
  }

  private openInbox(cb: (err: any, box: Imap.Box) => void): void {
    this.imap.openBox('INBOX', true, cb);
  }

  async fetchEmails(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        this.openInbox((err, box) => {
          if (err) {
            this.logger.error('Error opening inbox', err);
            reject(err);
            return;
          }

          const f = this.imap.seq.fetch('1:3', {
            bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)', 'TEXT'],
            struct: true,
          });

          const messages: any[] = [];

          f.on('message', (msg, seqno) => {
            this.logger.log(`Message #${seqno}`);
            const prefix = `(#${seqno}) `;

            let headers: any = {};
            let body: Buffer[] = [];

            msg.on('body', (stream, info) => {
              if (info.which === 'TEXT') {
                this.logger.log(`${prefix} Body [${info.which}]`);

                stream.on('data', (chunk) => {
                  body.push(chunk);
                });

                stream.once('end', () => {
                  const bodyString = Buffer.concat(body).toString('utf-8');
                  this.logger.log(`${prefix} Body [${info.which}] received`);
                  
                  // Verifica el contenido para asegurarte de que los caracteres se muestran correctamente
                  this.logger.log(`${prefix} Body content: ${bodyString}`);
                });
              } else {
                // Procesar los encabezados
                stream.on('data', (chunk) => {
                  const headerChunk = chunk.toString('utf-8');
                  headers = Imap.parseHeader(headerChunk);
                  this.logger.log(`${prefix} Header parsed: ${JSON.stringify(headers)}`);
                });
              }
            });

            msg.once('attributes', (attrs) => {
              this.logger.log(`${prefix} Attributes: ${JSON.stringify(attrs, null, 8)}`);
            });

            msg.once('end', () => {
              this.logger.log(`${prefix} Finished`);
              messages.push({
                seqno,
                headers,
                body: Buffer.concat(body).toString('utf-8'), // Convertir a string UTF-8
              });
            });
          });

          f.once('error', (err) => {
            this.logger.error('Fetch error:', err);
            reject(err);
          });

          f.once('end', () => {
            this.logger.log('Done fetching all messages!');
            this.imap.end();
            resolve(messages);
          });
        });
      });

      this.imap.once('error', (err) => {
        this.logger.error('IMAP error:', err);
        reject(err);
      });

      this.imap.once('end', () => {
        this.logger.log('Connection ended');
      });

      this.imap.connect();
    });
  }
}

