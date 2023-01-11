import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CityResponseDTO } from './dto';
import { CityEntity } from './entities';

@Injectable()
export class CitiesService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async getCity(id: string): Promise<CityResponseDTO | null> {
    try {
      const foundCity = await this.cityRepository.findOne({
        where: { id },
      });
      return this.mapper.map(foundCity, CityEntity, CityResponseDTO);
    } catch (err) {
      throw err;
    }
  }
}
