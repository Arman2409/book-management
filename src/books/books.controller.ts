import { Controller, Get, Put, Param, Body, Delete, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../../src/auth/auth.guard';
import { BooksService } from './books.service';
import type { Book } from '../../types/books';

@UseGuards(AuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.getBook(id);
  }

  @Post()
  async createBook(@Body() book: Book) {
    return await this.bookService.createBook(book);
  }
  
  @Put(':id')
  async updateBook(@Param('id') id: number, @Body() book: any) {
    return await this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<void> {
    await this.bookService.deleteBook(id);
  }
}