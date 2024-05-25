import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/tools/prisma.service";
import { CustomLogger } from '../../src/tools/logger.service';
import { AuthorsService } from "../../src/authors/authors.service";
import { AuthorsValidationService } from "../../src/authors/validation/authorValidation.service";

describe("Delete Book", () => {
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
        const author = {
            id: 111111111111,
            name: "Victor Hugo",
            biography: "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
            birthDate: new Date('1802-02-26'),
        };

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.authors, 'delete').mockResolvedValueOnce(author);

        const deleteResult = await service.deleteAuthor(11111111111);
        
        expect(deleteResult).toEqual(undefined);
    });
})