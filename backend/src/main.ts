import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASSWORD:', process.env.MAIL_PASSWORD);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    }),
  );

  app.setGlobalPrefix('api/v2');
  await app.listen(3000);
}
bootstrap();
