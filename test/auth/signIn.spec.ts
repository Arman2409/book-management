import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { CustomLogger } from '../../src/tools/logger.service';
import { PrismaService } from '../../src/tools/prisma.service';
import { AuthService } from '../../src/auth/auth.service';
import { AuthValidationService } from '../../src/auth/validation/authValidation.service';

describe("Sign In", () => {
    let service: AuthService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, AuthValidationService, JwtService, CustomLogger], // Include both services
        }).compile();

        service = module.get<AuthService>(AuthService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should return access token when signing in', async () => {
        let userData = {
            email: "johndoes@gmail.com",
            password: "password123"
        };

        // Mock Prisma methods (replace with actual implementation)
        jest.spyOn(prisma.users, 'findUnique').mockResolvedValueOnce({
            ...userData,
            id: 1,
            name: "John Doe",
            password: await hash("password123", 15)
        })

        const signInResult = await service.signIn(userData);

        expect(signInResult).toHaveProperty("access_token");
    });
})