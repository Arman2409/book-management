import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync } from "bcrypt"

import { PrismaService } from '../_services/prisma.service';
import { AuthValidationService } from './validation/authValidation.service';
import type { SignInBody, SignUpBody } from '../../types/auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly validator: AuthValidationService
    ) { }

    async signUp({ email, name, password }: SignUpBody): Promise<{ access_token: string }> {
        if (!name) {
            throw new HttpException("Field name is required for user creation", HttpStatus.BAD_REQUEST)
        }
        this.validator.validateEmailAndPassword(email, password);
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
        return { access_token: this.jwtService.sign(payload, 
            {
            secret: process.env.JWT_SECRET
            }
        ) };
    }

    async signIn({ email, password }: SignInBody): Promise<{ access_token: string } | undefined> {
        this.validator.validateEmailAndPassword(email, password);
        
        const user = await this.prisma.users.findUnique({
            where: { email }
        });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const isRightPassword = compareSync(password, user.password);
        if (!isRightPassword) {
            throw new HttpException("Wrong password provided", HttpStatus.BAD_REQUEST);
        }
        const payload = { id: user.id };
        return { access_token: this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET
        }) };
    }
}