import { Module } from '@nestjs/common';

import { PrismaService } from '../_services/prisma.service';
import { AuthorsValidationService } from './validation/authorValidation.service';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  providers: [AuthorsService, AuthorsValidationService, PrismaService],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
