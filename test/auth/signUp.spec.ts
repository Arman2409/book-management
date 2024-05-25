import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../../src/auth/auth.service';
import { PrismaService } from '../../src/_services/prisma.service';
import { AuthValidationService } from '../../src/auth/validation/authValidation.service';
import type { SignUpBody } from '../../types/auth';

describe("Sign Up", () => {
    let service: AuthService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, AuthValidationService, JwtService], // Include both services
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should return access token when creating new user', async () => {
        const userData: SignUpBody = {
            name: "John Does",
            email: "johndoes@gmail.com",
            password: "password123",
        };

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.users, 'create').mockResolvedValueOnce({id: 1, ...userData});

        const createUserResult = await service.signUp(userData);

        expect(createUserResult).toHaveProperty("access_token");
    });
})