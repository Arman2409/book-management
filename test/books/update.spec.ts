import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../src/tools/services/prisma.service';
import { CustomLogger } from '../../src/tools/services/logger.service';
import { BooksService } from '../../src/modules/books/books.service';
import { BooksValidationService } from '../../src/modules/books/validation/bookValidation.service';
import { testBookData, testCreateBookData } from './data';
import type { CreateBookBody } from '../../types/books';

describe('Update Book', () => {
  let service: BooksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        PrismaService,
        BooksValidationService,
        CustomLogger,
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should throw error if empty object provided', async () => {
    expect(
      service.updateBook(1111111111, {} as CreateBookBody),
    ).rejects.toThrow(
      'At least one of authorId, title, isbn, publishedDate is required',
    );
  });

  it('should update the book', async () => {
    // Mock Prisma methods (replace with actual implementation)
    jest.spyOn(prisma.books, 'update').mockResolvedValueOnce(testBookData);

    const updateBookResult = await service.updateBook(
      1111111111,
      testCreateBookData,
    );

    expect(updateBookResult).toStrictEqual(testBookData);
  });
});
