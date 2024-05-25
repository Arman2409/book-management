import { Controller, Get, Put, Param, Body, Delete, Post } from '@nestjs/common';

import { BooksService } from './books.service';
import type { Book } from '../../types/books';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  async createBook(@Body() book: Book) {
    return await this.bookService.createBook(book);
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    return await this.bookService.getBook(id);
  }

  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
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