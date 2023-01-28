import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { CityResponseDTO } from './dto';
import { CitiesService } from './cities.service';
import { CityEntity } from './entities';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly citiesService: CitiesService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'return cities' })
  @ApiResponse({
    status: 200,
    description: 'Return cities',
    type: CityResponseDTO,
  })
  async getCities(): Promise<CityResponseDTO[]> {
    const cities = await this.citiesService.getCities();

    return cities.map((cityEntity) =>
      this.mapper.map(cityEntity, CityEntity, CityResponseDTO),
    );
  }
}
