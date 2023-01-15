import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

import { CityResponseDTO } from './dto';
import { CitiesService } from './cities.service';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/')
  @ApiOperation({ summary: 'return cities' })
  @ApiResponse({
    status: 200,
    description: 'Return cities',
    type: CityResponseDTO,
  })
  async getCities(): Promise<CityResponseDTO[]> {
    return await this.citiesService.getCities();
  }
}
