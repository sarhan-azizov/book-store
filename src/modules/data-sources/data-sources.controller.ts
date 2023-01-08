import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { DataSourceResponseDTO } from './dto';

@ApiBearerAuth()
@ApiTags('Data Sources')
@Controller('data-sources')
export class DataSourcesController {
  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Data Source' })
  @ApiResponse({
    status: 200,
    description: 'Return Data Source',
    type: DataSourceResponseDTO,
  })
  getDataSourceById(): null {
    return null;
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create Data Source' })
  @ApiResponse({
    status: 201,
    description: 'Return Data Source',
    type: DataSourceResponseDTO,
  })
  public createDataSource(): null {
    return null;
  }
}
