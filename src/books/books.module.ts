import { Module } from '@nestjs/common';

import { PrismaService } from '../_services/prisma.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksValidationService } from './validation/bookValidation.service';

@Module({
  providers: [BooksService, PrismaService, BooksValidationService],
  controllers: [BooksController]
})
export class BooksModule {}
