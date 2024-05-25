import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/services/prisma.service";
import { CustomLogger } from '../../src/tools/services/logger.service';
import { BooksService } from "../../src/modules/books/books.service";
import { BooksValidationService } from "../../src/modules/books/validation/bookValidation.service";

describe("Delete Book", () => {
    let service: BooksService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, PrismaService, BooksValidationService, CustomLogger],
        }).compile();

        service = module.get<BooksService>(BooksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should delete book', async () => {
        const newBook = {
            id: 111111111111,
            authorId: 111111111111,
            title: 'Test Book',
            isbn: '1234567890123',
            publishedDate: new Date(),
        };

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.books, 'delete').mockResolvedValueOnce(newBook);

        const deleteResult = await service.deleteBook(111111111111);
        
        expect(deleteResult).toEqual(undefined);
    });
})