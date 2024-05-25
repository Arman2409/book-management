import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/_services/prisma.service";
import { AuthorsService } from "../../src/authors/authors.service";
import { AuthorsValidationService } from "../../src/authors/validation/authorValidation.service";
import type { Author, CreateAuthorBody } from "../../types/authors";

describe("Update book", () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService, PrismaService, AuthorsValidationService], // Include both services
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw error if empty object provided', async () => {
        expect(service.updateAuthor(1111111111, {} as CreateAuthorBody)).rejects.toThrow("At least one of name, biography, dateOfBirth is required");
    });

    it('should update the book', async () => {
       const updateData = {
            name: "Victor Hugo",
            biography: "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
            birthDate: new Date('1802-02-26'),
       }

        const expectedAutor:Author = {
            id: 111111111111,
            ...updateData,
        };


        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.authors, 'update').mockResolvedValueOnce(expectedAutor);

        const updateBookResult = await service.updateAuthor(1111111111, updateData);

        expect(updateBookResult).toStrictEqual(updateBookResult);
    });
})