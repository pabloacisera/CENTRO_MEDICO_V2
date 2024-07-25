import { Module } from '@nestjs/common';
import { MailController } from './correos.controller';
import { MailService } from './correos.service';

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService],
})

export class CorreosModule {}