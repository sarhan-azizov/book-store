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

  @Get('/:cityId')
  @ApiOperation({ summary: 'get city' })
  @ApiResponse({
    status: 200,
    description: 'Return city',
    type: CityResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'City with provided id does not exist',
    type: CommonErrorResponseDTO,
  })
  async getCities(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<CityResponseDTO> {
    const foundCity = await this.citiesService.getCity(id);

    if (!foundCity) {
      throw new NotFoundException(`city not found with id: ${id}`);
    }

    return foundCity;
  }
}
