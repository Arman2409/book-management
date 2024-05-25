import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/prisma.service";
import { CustomLogger } from "../../src/tools/logger.service";
import { BooksService } from "../../src/books/books.service";
import { BooksValidationService } from "../../src/books/validation/bookValidation.service";
import { Book } from "types/books";

describe("Get Book", () => {
    let service: BooksService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, PrismaService, BooksValidationService, CustomLogger],
        }).compile();

        service = module.get<BooksService>(BooksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should return empty array if no books were found', async () => {
        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.books, 'findMany').mockResolvedValueOnce([]);

        const findResult = await service.getAllBooks();

        expect(findResult).toEqual([]);
    });

    it('should return the book which was found', async () => {
        const book: Book = {
            id: 111111111111,
            authorId: 111111111111,
            title: 'Test Book',
            isbn: '1234567890123',
            publishedDate: new Date(),
        };

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.books, 'findUnique').mockResolvedValueOnce(book);
        const findResult = await service.getBook(111111111111);

        expect(findResult).toStrictEqual(book);
    });
})