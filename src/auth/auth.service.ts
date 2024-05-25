import { HttpException, HttpStatus, Injectable, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compareSync } from "bcrypt"

import { bcryptRounds } from '../../configs/auth';
import { PrismaService } from '../tools/prisma.service';
import { CustomLogger } from '../tools/logger.service';
import handleErrorResponse from '../tools/handleErrorResponse';
import { AuthValidationService } from './validation/authValidation.service';
import type { SignInBody, SignUpBody } from '../../types/auth';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly validator: AuthValidationService,
        private readonly logger: CustomLogger
    ) { }

    async signUp({ email, name, password }: SignUpBody): Promise<{ access_token: string }> {
        try {
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
                    password: await hash(password, bcryptRounds)
                }
            });
            const payload = { id: newUser.id };
            return {
                access_token: this.jwtService.sign(payload,
                    {
                        secret: process.env.JWT_SECRET
                    }
                )
            };
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }

    async signIn({ email, password }: SignInBody): Promise<{ access_token: string } | undefined> {
        try {
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
            return {
                access_token: this.jwtService.sign(payload, {
                    secret: process.env.JWT_SECRET
                })
            };
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }
}