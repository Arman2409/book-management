import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthorsModule, BooksModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
