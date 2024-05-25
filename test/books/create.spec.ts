import { Test, TestingModule } from "@nestjs/testing";
import { Authors } from "@prisma/client";

import { PrismaService } from "../../src/tools/services/prisma.service";
import { CustomLogger } from '../../src/tools/services/logger.service';
import { BooksService } from "../../src/modules/books/books.service";
import { BooksValidationService } from "../../src/modules/books/validation/bookValidation.service";
import { testBookData, testCreateBookData } from "./data";

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
        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.books, 'create').mockResolvedValueOnce(testBookData);

        await expect(service.createBook(testCreateBookData)).rejects.toThrow("Author not found");
    });

    it('should create new book', async () => {
        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.books, 'create').mockResolvedValueOnce(testBookData);
        jest.spyOn(prisma.authors, 'findUnique').mockResolvedValueOnce({} as Authors);

        const createBookResult = await service.createBook(testCreateBookData);

        expect(createBookResult).toStrictEqual(testBookData);
    });
})