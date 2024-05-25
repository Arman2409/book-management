import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from "bcrypt"

import { PrismaService } from '../_services/prisma.service';
import { AuthValidationService } from './validation/authValidation.service';
import type { User } from '../../types/auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly validator: AuthValidationService
    ) { }

    async signUp({ email, name, password }: User): Promise<{ access_token: string }> {
        if (!name || !email || !password) {
            throw new HttpException("Required fields for user creation: name, email, password", HttpStatus.BAD_REQUEST)
        }
        this.validator.validateEmail(email);
        this.validator.validatePassword(password);
        const existingUser = await this.prisma.users.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            throw new HttpException("User wtih the provided email already exists", HttpStatus.CONFLICT);
        }
        const newUser = await this.prisma.users.create({
            data: {
                email,
                name,
                password: await hash(password, 15)
            }
        });
        const payload = { id: newUser.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async signIn({ email, password }: { email: string, password: string }): Promise<{ access_token: string } | undefined> {
        this.validator.validateEmail(email);
        this.validator.validatePassword(password);
        const user = await this.prisma.users.findUnique({
            where: { email }
        });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const isRightPassword = compare(password, user.password);
        if (!isRightPassword) {
            throw new HttpException("Wrong password provided", HttpStatus.BAD_REQUEST);
        }
        const payload = { id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
}