import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { CustomLogger } from '../../src/tools/services/logger.service';
import { PrismaService } from '../../src/tools/services/prisma.service';
import { AuthService } from '../../src/modules/auth/auth.service';
import { AuthValidationService } from '../../src/modules/auth/validation/authValidation.service';
import { testSignInData, testSignUpData } from './data';

describe('Sign In', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        AuthValidationService,
        JwtService,
        CustomLogger,
      ], // Include both services
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return access token when signing in', async () => {
    // Mock Prisma methods (replace with actual implementation)
    jest.spyOn(prisma.users, 'findUnique').mockResolvedValueOnce({
      ...testSignUpData,
      id: 1,
      password: await hash(testSignUpData.password, 15),
    });

    const signInResult = await service.signIn(testSignInData);

    expect(signInResult).toHaveProperty('access_token');
  });
});
