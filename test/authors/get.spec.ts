import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../src/tools/services/prisma.service';
import { CustomLogger } from '../../src/tools/services/logger.service';
import { AuthorsService } from '../../src/modules/authors/authors.service';
import { AuthorsValidationService } from '../../src/modules/authors/validation/authorValidation.service';
import { testAuthorData } from './data';

describe('Get Author', () => {
  let service: AuthorsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        PrismaService,
        AuthorsValidationService,
        CustomLogger,
      ],
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
    // Mock Prisma method (replace with actual implementation)
    jest
      .spyOn(prisma.authors, 'findUnique')
      .mockResolvedValueOnce(testAuthorData);
    const findResult = await service.getAuthor(111111111111);

    expect(findResult).toStrictEqual(testAuthorData);
  });
});
