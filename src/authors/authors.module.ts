import { Module } from '@nestjs/common';

import { CustomLogger } from '../tools/logger.service';
import { PrismaService } from '../tools/prisma.service';
import { AuthorsValidationService } from './validation/authorValidation.service';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';

@Module({
  providers: [AuthorsService, AuthorsValidationService, PrismaService, CustomLogger],
  controllers: [AuthorsController]
})
export class AuthorsModule {}
