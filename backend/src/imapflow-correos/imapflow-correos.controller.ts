import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ImapflowCorreosService } from './imapflow-correos.service';

@Controller('imapflow-correos')
export class ImapflowCorreosController {
  constructor(private readonly imapflowCorreosService: ImapflowCorreosService) {}

  @Get('fetch')
  async fetchEmails() {
    try {
      await this.imapflowCorreosService.connectAndFetchEmails();
      const emails = this.imapflowCorreosService.getEmails();
      return { message: 'Emails fetched successfully', emails };
    } catch (error) {
      throw new HttpException('Failed to fetch emails', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

