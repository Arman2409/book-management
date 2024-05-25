import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './validation/authValidation.service';
import { PrismaService } from '../../src/_services/prisma.service';

@Module({
  imports:[
    JwtModule.register({
    global: true,
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, AuthValidationService, JwtService, PrismaService]
})
export class AuthModule {}
