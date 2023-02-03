/*
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LanuageEntity } from './entities';
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
    @InjectRepository(LanuageEntity)
    private cityRepository: Repository<LanuageEntity>,
  ) {}

  async getCities(): Promise<LanuageEntity[]> {
    try {
      return await this.cityRepository.find();
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
*/
