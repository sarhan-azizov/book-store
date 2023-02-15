import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { StoreDepartmentsEntity } from './entities';
import { StoreDepartmentsDTO } from './dto';

@Injectable()
export class StoreDepartmentsService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(StoreDepartmentsEntity)
    private authorsRepository: Repository<StoreDepartmentsEntity>,
  ) {}

  async getStoreDepartments(): Promise<StoreDepartmentsDTO[]> {
    try {
      const storeDepartments = await this.authorsRepository.find();

      return this.mapper.mapArray(
        storeDepartments,
        StoreDepartmentsEntity,
        StoreDepartmentsDTO,
      );
    } catch (err) {
      throw err;
    }
  }
}
