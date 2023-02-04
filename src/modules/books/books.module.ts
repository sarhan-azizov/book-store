import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksProfile } from './books.profile';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import {
  AuthorEntity,
  BookEntity,
  LanguageEntity,
  CategoryEntity,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      LanguageEntity,
      CategoryEntity,
      BookEntity,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksProfile],
  exports: [],
})
export class BooksModule {}
