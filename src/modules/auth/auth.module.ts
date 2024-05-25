import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { jwtExpirationDuration } from '../../../configs/auth';
import { PrismaService } from '../../tools/services/prisma.service';
import { CustomLogger } from '../../tools/services/logger.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './validation/authValidation.service';


@Module({
  imports:[
    JwtModule.register({
    global: true,
    signOptions: { expiresIn: `${jwtExpirationDuration}s` },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, AuthValidationService, JwtService, PrismaService, CustomLogger]
})
export class AuthModule {}
