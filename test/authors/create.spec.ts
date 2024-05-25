import { Test, TestingModule } from "@nestjs/testing";

import { CustomLogger } from '../../src/tools/services/logger.service';
import { PrismaService } from "../../src/tools/services/prisma.service";
import { AuthorsService } from "../../src/modules/authors/authors.service";
import { AuthorsValidationService } from "../../src/modules/authors/validation/authorValidation.service";
import { testAuthorData } from "./data";
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

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.authors, 'create').mockResolvedValueOnce(testAuthorData);

        const createAuthorResult = await service.createAuthor(testAuthorData);

        expect(createAuthorResult).toStrictEqual(testAuthorData);
    });
})