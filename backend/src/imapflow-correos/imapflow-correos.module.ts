import { Module } from '@nestjs/common';
import { ImapflowCorreosService } from './imapflow-correos.service';
import { ImapflowCorreosController } from './imapflow-correos.controller';

@Module({
  controllers: [ImapflowCorreosController],
  providers: [ImapflowCorreosService],
})
export class ImapflowCorreosModule {}
