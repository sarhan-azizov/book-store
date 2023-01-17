import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityEntity } from './entities';
import {
  CustomBusinessException,
  CustomDatabaseException,
  EnumModules,
} from '../../common';

@Injectable()
export class CitiesService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async getCities(): Promise<CityEntity[]> {
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
