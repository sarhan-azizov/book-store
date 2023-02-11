import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CustomBusinessException,
  CustomDatabaseException,
  EnumModules,
} from '@/common';

import { BookEntity } from './entities';
import { BookQueryDTO } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(query: BookQueryDTO): Promise<BookEntity[]> {
    try {
      const querySQL = this.bookRepository
        .createQueryBuilder('books')
        .leftJoinAndSelect('books.language', 'language')
        .leftJoinAndSelect('books.categories', 'category')
        .leftJoinAndSelect('books.authors', 'author');

      if (query.categories) {
        querySQL.andWhere('category.id IN (:...categories)', {
          categories: query.categories.split(','),
        });
      }

      if (query.languages) {
        querySQL.andWhere('language.id IN (:...languages)', {
          languages: query.languages.split(','),
        });
      }

      if (query.authors) {
        querySQL.andWhere('author.id IN (:...authors)', {
          authors: query.authors.split(','),
        });
      }

      return querySQL.getMany();
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }
}
