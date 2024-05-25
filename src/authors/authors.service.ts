import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../tools/prisma.service';
import handleErrorResponse from '../tools/handleErrorResponse';
import { CustomLogger } from '../tools/logger.service';
import { AuthorsValidationService } from './validation/authorValidation.service';
import type { Author, CreateAuthorBody, UpdateAuthorBody } from '../../types/authors';

@Injectable()
export class AuthorsService {
    constructor(private readonly prisma: PrismaService,
        private readonly validationService: AuthorsValidationService,
        private readonly logger: CustomLogger
    ) { }

    @HttpCode(HttpStatus.CREATED)
    async createAuthor(authorData: CreateAuthorBody): Promise<Author> {
        try {
            this.validationService.validateBookData(authorData, "create");
            return await this.prisma.authors.create({ data: authorData });
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }

    @HttpCode(HttpStatus.OK)
    async getAuthor(id: number): Promise<Author | any> {
        try {
            if (!id) {
                throw new HttpException("Id not provided", HttpStatus.BAD_REQUEST);
            }
            const author = await this.prisma.authors.findUnique({ where: { id: Number(id) } });
            if (!author) {
                throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
            }
            return author;
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }

    @HttpCode(HttpStatus.OK)
    async getAllAuthors(): Promise<Author[]> {
        try {
            return await this.prisma.authors.findMany();
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }

    @HttpCode(HttpStatus.OK)
    async updateAuthor(id: number, authorData: UpdateAuthorBody): Promise<Author | null> {
        try {
            this.validationService.validateBookData(authorData, "update");

            const { name, biography, birthDate } = { ...authorData };
            const updateData: CreateAuthorBody = {} as CreateAuthorBody;
            if (name) updateData.name = name;
            if (biography) updateData.biography = biography;
            if (birthDate) updateData.birthDate = birthDate;

            return await this.prisma.authors.update({
                where: { id: Number(id) },
                data: updateData,
            });
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAuthor(id: number): Promise<void> {
        try {
            if (!id) {
                throw new HttpException("Invalid id provided", HttpStatus.BAD_REQUEST);
            }
    
            await this.prisma.authors.delete(
                { where: { id: Number(id) } }
            ).catch(() => {
                throw new HttpException("Author not found for deletion", HttpStatus.NOT_FOUND);
            })
        } catch (error) {
            handleErrorResponse(error, this.logger);
        }
    }
}