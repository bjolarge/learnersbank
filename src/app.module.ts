import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import * as Joi from 'joi';

@Module({
  imports: [     
     ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
         //PORT
         PORT: Joi.number().required(),
         //...SECRETS
         JWT_SECRET: Joi.string().required(),
         JWT_EXPIRATION_TIME: Joi.string().required(),
         // Refresh token part
         JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
         JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
         JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
         JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
         //google Oauth
        //  GOOGLE_ID: Joi.string().required(),
        //  GOOGLE_SECRET: Joi.string().required(),
         //Email Service
        //  EMAIL_SERVICE: Joi.string().required(),
        //  EMAIL_USER: Joi.string().required(),
        //  EMAIL_PASSWORD: Joi.string().required(),
        //  EMAIL_CONFIRMATION_URL: Joi.string().required(),
         JWT_VERIFICATION_TOKEN_SECRET:Joi.string().required(),
         JWT_VERIFICATION_TOKEN_EXPIRATION_TIME:Joi.string().required(),
         // Environment options
        //  NODE_ENV: Joi.string()
        //  .required()
        //  .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
       })
       }),
 
     TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
         type: 'mongodb',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
         database: configService.get('DB_NAME'),
         autoLoadEntities: true,
         synchronize:true ,
       }),
       inject: [ConfigService],
     }),
 
     UserModule,
 
     AuthModule,
 
     AccountsModule, 
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
