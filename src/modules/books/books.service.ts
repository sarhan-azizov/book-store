import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Raw } from 'typeorm';

import {
  CustomBusinessException,
  CustomDatabaseException,
  EnumModules,
  CommonPaginationResponseDTO,
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

  async getBook(bookId: string): Promise<BookEntity | null> {
    try {
      return this.bookRepository.findOne({ where: { id: bookId } });
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

  async getBooks(
    query: BookQueryDTO,
  ): Promise<CommonPaginationResponseDTO<BookEntity>> {
    try {
      const page = query.page ? query.page - 1 : 0;
      const perPage = query.perPage || 10;
      const where: any = {};

      if (query.languages) {
        where.language = {
          id: In(query.languages.split(',')),
        };
      }

      if (query.categories) {
        where.categories = {
          id: In(query.categories.split(',')),
        };
      }

      if (query.authors) {
        where.authors = {
          id: In(query.authors.split(',')),
        };
      }

      const [data, itemsCount] = await this.bookRepository.findAndCount({
        where: query.search
          ? [
              {
                sku: In(
                  query.search
                    .split(',')
                    .map((sku) => sku.toLowerCase().trim()),
                ),
                ...where,
              },
              {
                title: Raw(
                  (field) =>
                    `LOWER(${field}) Like '%${query.search.toLowerCase()}%'`,
                ),
                ...where,
              },
            ]
          : where,
        relations: {
          language: true,
          categories: true,
          authors: true,
        },
        skip: page * perPage,
        take: perPage,
        order: {
          title: 'ASC',
        },
      });

      return {
        data,
        metaData: {
          pages: Math.ceil(itemsCount / perPage),
          perPage,
          itemsCount,
        },
      };
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
