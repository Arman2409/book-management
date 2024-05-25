import { Test, TestingModule } from "@nestjs/testing";

import { CustomLogger } from '../../src/tools/logger.service';
import { PrismaService } from "../../src/tools/prisma.service";
import { AuthorsService } from "../../src/authors/authors.service";
import { AuthorsValidationService } from "../../src/authors/validation/authorValidation.service";
import type { CreateAuthorBody } from "../../types/authors";

describe("Create Author", () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService, PrismaService, AuthorsValidationService, CustomLogger],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw error if invalid data provided', async () => {
        await expect(service.createAuthor({} as CreateAuthorBody)).rejects.toThrow('Missing required fields: name, biography, dateOfBirth');
    });

    it('should create new author', async () => {
        const newAuthor = {
            id: 111111111111,
            name: "Victor Hugo",
            biography: "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
            birthDate: new Date('1802-02-26'),
        };

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.authors, 'create').mockResolvedValueOnce(newAuthor);

        const createAuthorResult = await service.createAuthor(newAuthor);

        expect(createAuthorResult).toStrictEqual(newAuthor);
    });
})