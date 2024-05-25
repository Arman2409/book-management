import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthorsModule, BooksModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
