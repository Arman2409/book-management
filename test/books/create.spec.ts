import { Test, TestingModule } from "@nestjs/testing";
import { Authors } from "@prisma/client";

import { PrismaService } from "../../src/tools/prisma.service";
import { CustomLogger } from '../../src/tools/logger.service';
import { BooksService } from "../../src/books/books.service";
import { BooksValidationService } from "../../src/books/validation/bookValidation.service";

describe("Create Book", () => {
    let service: BooksService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, PrismaService, BooksValidationService, CustomLogger],
        }).compile();

        service = module.get<BooksService>(BooksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw error if author not found', async () => {
        const newBook = {
            id: 111111111111,
            authorId: 111111111111,
            title: 'Test Book',
            isbn: '1234567890123',
            publishedDate: new Date(),
        };

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.books, 'create').mockResolvedValueOnce(newBook);

        await expect(service.createBook(newBook)).rejects.toThrow("Author not found");
    });

    it('should create new author', async () => {
        const newBook = {
            id: 111111111111,
            authorId: 111111111111,
            title: 'Test Book',
            isbn: '1234567890123',
            publishedDate: new Date(),
        };

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.books, 'create').mockResolvedValueOnce(newBook);
        jest.spyOn(prisma.authors, 'findUnique').mockResolvedValueOnce({} as Authors);

        const createBookResult = await service.createBook(newBook);

        expect(createBookResult).toStrictEqual(newBook);
    });
})