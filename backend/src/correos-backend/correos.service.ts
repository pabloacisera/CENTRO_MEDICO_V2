import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodeMailer from 'nodemailer'

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendMail(from: string, to: string, subject: string, text: string, file?: Express.Multer.File) {
        const mailOptions: any = {
            from,
            to,
            subject,
            text
        };

        if (file) {
            mailOptions.attachments = [
                {
                    filename: file.originalname,
                    content: file.buffer,
                    encoding: 'base64'
                }
            ];
        }

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Correo enviado de: ${from} a: ${to}`);
        } catch (error) {
            console.error(`Error al enviar correo: ${error.message}`);
        }
    }
}