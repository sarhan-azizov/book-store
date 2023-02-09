import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from './entities';
import { CategoriesResponseDTO } from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(CategoryEntity)
    private categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async getCategories(): Promise<CategoriesResponseDTO[]> {
    try {
      const categories = await this.categoriesRepository.find();

      return this.mapper.mapArray(
        categories,
        CategoryEntity,
        CategoriesResponseDTO,
      );
    } catch (err) {
      throw err;
    }
  }
}
