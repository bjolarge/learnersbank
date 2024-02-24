import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      transform:true,
      forbidNonWhitelisted:true,
      transformOptions:{
      enableImplicitConversion:true,
      }
    })
  );
const configService = app.get(ConfigService);
const PORT = +configService.get<number>("PORT")||3023;
await app.listen(PORT);
}
bootstrap();
