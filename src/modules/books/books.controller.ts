/*
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { BookResponseDto } from './dto';
import { BooksService } from './books.service';
import { BookEntity } from './entities';

@ApiTags('Cities')
@Controller('cities')
export class BooksController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly citiesService: BooksService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'return cities' })
  @ApiResponse({
    status: 200,
    description: 'Return cities',
    type: BookResponseDto,
  })
  async getCities(): Promise<BookResponseDto[]> {
    const cities = await this.citiesService.getCities();

    return cities.map((cityEntity) =>
      this.mapper.map(cityEntity, LanuageEntity, BookResponseDto),
    );
  }
}
*/
