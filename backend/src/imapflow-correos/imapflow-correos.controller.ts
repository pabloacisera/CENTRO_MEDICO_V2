import { Controller, Get } from '@nestjs/common';
import { ImapService } from './imapflow-correos.service';

@Controller('imap')
export class ImapController {
  constructor(private readonly imapService: ImapService) {}

  @Get('fetch-emails')
  async fetchEmails() {
    try {
      const emails = await this.imapService.fetchEmails();
      return { emails };
    } catch (error) {
      return { error: 'Failed to fetch emails', details: error };
    }
  }
}
