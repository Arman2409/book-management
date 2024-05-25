import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/services/prisma.service";
import { CustomLogger } from '../../src/tools/services/logger.service';
import { AuthorsService } from "../../src/modules/authors/authors.service";
import { AuthorsValidationService } from "../../src/modules/authors/validation/authorValidation.service";
import { testAuthorData, testAuthorUpdateData } from "./data";
import type { CreateAuthorBody } from "../../types/authors";

describe("Update Author", () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService, PrismaService, AuthorsValidationService, CustomLogger],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should throw error if empty object provided', async () => {
        expect(service.updateAuthor(1111111111, {} as CreateAuthorBody)).rejects.toThrow("At least one of name, biography, dateOfBirth is required");
    });

    it('should update the book', async () => {

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.authors, 'update').mockResolvedValueOnce(testAuthorData);

        const updateBookResult = await service.updateAuthor(1111111111, testAuthorUpdateData);

        expect(updateBookResult).toStrictEqual(testAuthorData);
    });
})