import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/_services/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(book: any): Promise<Book> {
    return await this.prisma.books.create({ data: book });
  }

  async getBook(id: number): Promise<Book | undefined> {
    return await this.prisma.books.findUnique({ where: { id }, include: { author: true } }); // Include author relation
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.prisma.books.findMany({ include: { author: true } }); // Include author relation
  }

  async updateBook(id: number, book: any): Promise<Book | undefined> {
    return await this.prisma.books.update({
      where: { id },
      data: book,
    });
  }

  async deleteBook(id: number): Promise<void> {
    await this.prisma.books.delete({ where: { id } });
  }
}

// Interface for Book data (optional)
export interface Book {
  id: number;
  title: string;
  isbn?: string;
  publishedDate?: Date;
  author?: Author;
}

export interface Author {
  id: number;
  name: string;
  biography?: string;
  dateOfBirth?: Date;
}
