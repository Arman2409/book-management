import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { PrismaService } from '../tools/prisma.service';
import { CustomLogger } from '../tools/logger.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './validation/authValidation.service';


@Module({
  imports:[
    JwtModule.register({
    global: true,
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, AuthValidationService, JwtService, PrismaService, CustomLogger]
})
export class AuthModule {}
