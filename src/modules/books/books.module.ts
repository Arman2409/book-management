import { Module } from '@nestjs/common';

import { PrismaService } from '../../tools/services/prisma.service';
import { CustomLogger } from '../../tools/services/logger.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksValidationService } from './validation/bookValidation.service';

@Module({
  providers: [
    BooksService,
    PrismaService,
    BooksValidationService,
    CustomLogger,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
