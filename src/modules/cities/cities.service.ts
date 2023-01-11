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

  async getCities(): Promise<CityResponseDTO[]> {
    try {
      const foundCities = await this.cityRepository.find();
      return foundCities.map((cityEntity) =>
        this.mapper.map(cityEntity, CityEntity, CityResponseDTO),
      );
    } catch (err) {
      throw err;
    }
  }
}
