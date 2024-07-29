declare module 'imap' {
  import { EventEmitter } from 'events';

  // Define las opciones de configuración de IMAP
  export interface ImapOptions {
    user: string;
    password: string;
    host: string;
    port: number;
    tls: boolean;
  }

  // Define los atributos de los mensajes
  export interface MessageAttributes {
    uid: number;
    flags: string[];
    date: Date;
  }

  // Define la estructura de la caja de correo
  export interface Box {
    messages: {
      total: number;
    };
  }

  // Define el mensaje de correo
  export interface Message {
    on(event: 'body', listener: (stream: NodeJS.ReadableStream, info: { which: string }) => void): this;
    on(event: 'attributes', listener: (attrs: MessageAttributes) => void): this;
    on(event: 'end', listener: () => void): this;
    once(event: 'body', listener: (stream: NodeJS.ReadableStream, info: { which: string }) => void): this;
    once(event: 'attributes', listener: (attrs: MessageAttributes) => void): this;
    once(event: 'end', listener: () => void): this;
  }

  // Define la estructura del objeto Fetch
  export interface Fetch {
    on(event: 'message', listener: (msg: Message, seqno: number) => void): this;
    on(event: 'error', listener: (err: any) => void): this;
    on(event: 'end', listener: () => void): this;
    once(event: 'message', listener: (msg: Message, seqno: number) => void): this;
    once(event: 'error', listener: (err: any) => void): this;
    once(event: 'end', listener: () => void): this;
  }

  // Define la clase principal IMAP
  export default class Imap extends EventEmitter {
    constructor(options: ImapOptions);

    connect(): void;
    end(): void;
    openBox(boxName: string, readonly: boolean, callback: (err: any, box: Box) => void): void;
    seq: {
      fetch(sequence: string, options: { bodies: string[], struct: boolean }): Fetch;
    };
    static parseHeader(header: string): any;
  }
}
