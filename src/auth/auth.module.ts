import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidationService } from './validation/authValidation.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/_services/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthValidationService, JwtService, PrismaService]
})
export class AuthModule {}
