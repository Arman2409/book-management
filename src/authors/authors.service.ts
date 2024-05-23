import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../_services/prisma.service';
import { AuthorsValidationService } from './validation/authorValidation.service';
import type { Author, CreateAuthorBody } from '../types/authors';

@Injectable()
export class AuthorsService {
    constructor(private readonly prisma: PrismaService,
        private readonly validationService: AuthorsValidationService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    async createAuthor(authorData: CreateAuthorBody): Promise<Author> {
        this.validationService.validateBookData(authorData, "create");

        return await this.prisma.author.create({ data: authorData });
    }

    @HttpCode(HttpStatus.OK)
    async getAuthor(id: number): Promise<Author | null> {
        if (!id) {
            throw new HttpException("Id not provided", HttpStatus.BAD_REQUEST);
        }
        const author = await this.prisma.author.findUnique({ where: { id: Number(id) } });
        if (!author) {
            throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
        }
        return author;
    }

    @HttpCode(HttpStatus.OK)
    async getAllAuthors(): Promise<Author[]> {
        return await this.prisma.author.findMany();
    }

    @HttpCode(HttpStatus.OK)
    async updateAuthor(id: number, authorData: CreateAuthorBody): Promise<Author | null> {
        this.validationService.validateBookData(authorData, "update");

        const { name, biography, dateOfBirth } = { ...authorData };
        const updateData: CreateAuthorBody = {} as CreateAuthorBody;
        if (name) updateData.name = name;
        if (biography) updateData.biography = biography;
        if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;

        return await this.prisma.author.update({
            where: { id: Number(id) },
            data: updateData,
        });
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteAuthor(id: number): Promise<void> {
        if (!id) {
            throw new HttpException("Invalid Id provided", HttpStatus.BAD_REQUEST);
        }
        
        await this.prisma.books.delete(
            { where: { id: Number(id) } }
        ).catch(() => {
            throw new HttpException("Book not found for deletion", HttpStatus.NOT_FOUND);
        })
    }
}