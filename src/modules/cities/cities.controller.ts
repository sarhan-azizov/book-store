import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CommonErrorResponseDTO } from '../../common';
import { CityResponseDTO } from './dto';
import { CitiesService } from './cities.service';

@ApiBearerAuth()
@ApiTags('City')
@Controller('city')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('/')
  @ApiOperation({ summary: 'get cities' })
  @ApiResponse({
    status: 200,
    description: 'Return cities',
    type: CityResponseDTO,
  })
  async getCities(): Promise<CityResponseDTO[]> {
    return await this.citiesService.getCities();
  }
}
