import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/prisma.service";
import { CustomLogger } from "../../src/tools/logger.service";
import { BooksService } from "../../src/books/books.service";
import { BooksValidationService } from "../../src/books/validation/bookValidation.service";
import type { Book, CreateBookBody } from "../../types/books";

describe("Update Book", () => {
    let service: BooksService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, PrismaService, BooksValidationService, CustomLogger],
        }).compile();

        service = module.get<BooksService>(BooksService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw error if empty object provided', async () => {
        expect(service.updateBook(1111111111, {} as CreateBookBody)).rejects.toThrow("At least one of authorId, title, isbn, publishedDate is required");
    });

    it('should update the book', async () => {
        const updateData:Omit<CreateBookBody, "publishedDate"> = {
            authorId: 111111111111,
            title: 'Test Book',
            isbn: '1234567890123',
        };

        const expectedResult:Book = {
            ...updateData,
            id: 111111111111,
            publishedDate: new Date()
        };


        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.books, 'update').mockResolvedValueOnce(expectedResult);

        const updateBookResult = await service.updateBook(1111111111, updateData);

        expect(updateBookResult).toStrictEqual(expectedResult);
    });
})