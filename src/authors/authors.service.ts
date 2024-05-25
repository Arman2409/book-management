import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../_services/prisma.service';
import { AuthorsValidationService } from './validation/authorValidation.service';
import type { Author, CreateAuthorBody, UpdateAuthorBody } from '../../types/authors';

@Injectable()
export class AuthorsService {
    constructor(private readonly prisma: PrismaService,
        private readonly validationService: AuthorsValidationService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    async createAuthor(authorData: CreateAuthorBody): Promise<Author> {
        this.validationService.validateBookData(authorData, "create");

        return await this.prisma.authors.create({ data: authorData });
    }

    @HttpCode(HttpStatus.OK)
    async getAuthor(id: number): Promise<Author | null> {
        if (!id) {
            throw new HttpException("Id not provided", HttpStatus.BAD_REQUEST);
        }
        const author = await this.prisma.authors.findUnique({ where: { id: Number(id) } });
        if (!author) {
            throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
        }
        return author;
    }

    @HttpCode(HttpStatus.OK)
    async getAllAuthors(): Promise<Author[]> {
        return await this.prisma.authors.findMany();
    }

    @HttpCode(HttpStatus.OK)
    async updateAuthor(id: number, authorData: UpdateAuthorBody): Promise<Author | null> {
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
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAuthor(id: number): Promise<void> {
        if (!id) {
            throw new HttpException("Invalid id provided", HttpStatus.BAD_REQUEST);
        }
        
        await this.prisma.authors.delete(
            { where: { id: Number(id) } }
        ).catch(() => {
            throw new HttpException("Author not found for deletion", HttpStatus.NOT_FOUND);
        })
    }
}