import { Module } from '@nestjs/common';
import { ImapService } from './imapflow-correos.service';
import { ImapController } from './imapflow-correos.controller';

@Module({
  controllers: [ImapController],
  providers: [ImapService],
})
export class ImapflowCorreosModule {}
