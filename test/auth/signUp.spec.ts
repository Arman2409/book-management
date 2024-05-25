import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { CustomLogger } from '../../src/tools/services/logger.service';
import { PrismaService } from '../../src/tools/services/prisma.service';
import { AuthService } from '../../src/modules/auth/auth.service';
import { AuthValidationService } from '../../src/modules/auth/validation/authValidation.service';
import { testSignUpData } from './data';

describe("Sign Up", () => {
    let service: AuthService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, AuthValidationService, JwtService, CustomLogger],
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should return access token when creating new user', async () => {
        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.users, 'create').mockResolvedValueOnce({id: 1, ...testSignUpData});

        const createUserResult = await service.signUp(testSignUpData);

        expect(createUserResult).toHaveProperty("access_token");
    });
})