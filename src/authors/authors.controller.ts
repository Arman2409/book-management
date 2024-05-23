import { Controller, Get, Put, Param, Body, Delete, Post } from '@nestjs/common';

import { AuthorsService } from './authors.service'; 
import type { Author } from '../types/authors';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return await this.authorsService.getAllAuthors();
  }


  @Get(':id')
  async getAuthor(@Param('id') id: number): Promise<Author | null> {
    return await this.authorsService.getAuthor(id);
  }
  
  @Post()
  async createAuthor(@Body() author: Author) {
    return await this.authorsService.createAuthor(author);
  }

  @Put(':id')
  async updateAuthor(@Param('id') id: number, @Body() author: Author): Promise<Author | null> {
    return await this.authorsService.updateAuthor(id, author);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: number): Promise<void> {
    await this.authorsService.deleteAuthor(id);
  }
}