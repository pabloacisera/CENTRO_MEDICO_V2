import { Controller, Post, Body, UseInterceptors, UploadedFile } from "@nestjs/common";
import { MailService } from "./correos.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @Post('send')
    @UseInterceptors(FileInterceptor('file'))
    async sendMail(
        @Body('from') from: string,
        @Body('to') to: string,
        @Body('subject') subject: string,
        @Body('text') text: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        await this.mailService.sendMail(from, to, subject, text, file);
        return { message: 'Correo enviado!' };
    }
    @Post('notificar-turno')
    async notificarTurno(
        @Body('to') to: string,
        @Body('clienteNombre') clienteNombre: string,
        @Body('fechaTurno') fechaTurno: string
    ) {
        const subject = 'Recordatorio de Turno';
        const text = `Estimado/a ${clienteNombre},\n\nEste es un recordatorio de que tiene un turno programado para el ${fechaTurno}. Por favor, no falte.\n\nSaludos,\nSu Clínica`;
        await this.mailService.sendMailNotification(to, subject, text);
        return { message: 'Notificación de turno enviada!' };
    }
}
