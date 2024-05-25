import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/services/prisma.service";
import { CustomLogger } from '../../src/tools/services/logger.service';
import { AuthorsService } from "../../src/modules/authors/authors.service";
import { AuthorsValidationService } from "../../src/modules/authors/validation/authorValidation.service";
import { testAuthorData } from "./data";

describe("Delete Author", () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService, PrismaService, AuthorsValidationService, CustomLogger],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should delete author', async () => {
        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.authors, 'delete').mockResolvedValueOnce(testAuthorData);

        const deleteResult = await service.deleteAuthor(11111111111);
        
        expect(deleteResult).toEqual(undefined);
    });
})