import { Module } from '@nestjs/common';

import { PrismaService } from '../tools/prisma.service';
import { CustomLogger } from '../tools/logger.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksValidationService } from './validation/bookValidation.service';

@Module({
  providers: [BooksService, PrismaService, BooksValidationService, CustomLogger],
  controllers: [BooksController]
})
export class BooksModule {}
