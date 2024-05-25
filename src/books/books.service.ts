import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CustomLogger } from '../tools/logger.service';
import { PrismaService } from '../tools/prisma.service';
import handleErrorResponse from '../tools/handleErrorResponse';
import { BooksValidationService } from './validation/bookValidation.service';
import type { Book, CreateBookBody, UpdateBookBody } from '../../types/books';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService,
    private readonly validationService: BooksValidationService,
    private readonly logger: CustomLogger,
  ) { }

  @HttpCode(HttpStatus.CREATED)
  async createBook(bookData: CreateBookBody): Promise<Book> {
    try {
      this.validationService.validateBookData(bookData, "create");

      const authorExists = await this.prisma.authors.findUnique({
        where: { id: bookData.authorId }
      })
      if (!authorExists) {
        throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
      }
      return await this.prisma.books.create({
        data: bookData
      });
    } catch (error) {
      handleErrorResponse(error, this.logger);
    }
  }

  @HttpCode(HttpStatus.OK)
  async getBook(id: number): Promise<Book> {
    try {
      if (!id) {
        throw new HttpException("Id not provided", HttpStatus.BAD_REQUEST);
      }
      const book = await this.prisma.books.findUnique({ where: { id: Number(id) } });
      if (!book) {
        throw new HttpException("Book not found", HttpStatus.NOT_FOUND);
      }
      return book;
    } catch (error) {
      handleErrorResponse(error, this.logger);
    }
  }

  @HttpCode(HttpStatus.OK)
  async getAllBooks(): Promise<Book[]> {
    try {
      const allBooks = await this.prisma.books.findMany(); // Include author relation
      return allBooks;
    } catch (error) {
      handleErrorResponse(error, this.logger);
    }
  }

  @HttpCode(HttpStatus.OK)
  async updateBook(id: number, bookData: UpdateBookBody): Promise<Book | undefined> {
    try {
      this.validationService.validateBookData(bookData, "update");
      const allowedKeys = ["title", "isbn", "authorId", "publishedDate"];

      // Create a new object to store filtered values
      const newBook = {};

      // Loop through allowed keys
      for (const key of allowedKeys) {
        // Check if the key exists in the original object
        if (bookData.hasOwnProperty(key)) {
          newBook[key] = bookData[key];
        }
      }
      return await this.prisma.books.update({
        where: { id },
        data: newBook,
      })
    } catch (error) {
      handleErrorResponse(error, this.logger);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(id: number): Promise<void> {
    try {
      if (!id) {
        throw new HttpException("Invalid id provided", HttpStatus.BAD_REQUEST);
      }

      await this.prisma.books.delete(
        { where: { id: Number(id) } }
      ).catch(() => {
        throw new HttpException("Book not found for deletion", HttpStatus.NOT_FOUND);
      })
    } catch (error) {
      handleErrorResponse(error, this.logger);
    }
  }
}
