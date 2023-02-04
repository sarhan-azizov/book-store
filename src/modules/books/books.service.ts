import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from './entities';
import {
  CustomBusinessException,
  CustomDatabaseException,
  EnumModules,
} from '../../common';

@Injectable()
export class BooksService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async getBooks(): Promise<BookEntity[]> {
    try {
      return await this.bookRepository.find({
        relations: {
          language: true,
          categories: true,
          authors: true,
        },
      });
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
