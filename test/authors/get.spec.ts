import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "../../src/_services/prisma.service";
import { AuthorsService } from "../../src/authors/authors.service";
import { AuthorsValidationService } from "../../src/authors/validation/authorValidation.service";

describe("Get Author", () => {
    let service: AuthorsService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthorsService, PrismaService, AuthorsValidationService], // Include both services
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should return empty array if no authors were found', async () => {

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.authors, 'findMany').mockResolvedValueOnce([]);

        const findResult = await service.getAllAuthors();

        expect(findResult).toEqual([]);
    });

    it('should throw error if author is not found', async () => {
        const author = {
            id: 111111111111,
            name: "Victor Hugo",
            biography: "Victor Hugo was a French poet, novelist, and dramatist of the Romantic movement.",
            birthDate: new Date('1802-02-26'),
        };

        // Mock Prisma method (replace with actual implementation)
        jest.spyOn(prisma.authors, 'findUnique').mockResolvedValueOnce(author);
        const findResult = await service.getAuthor(111111111111);

        expect(findResult).toStrictEqual(author);
    });
})