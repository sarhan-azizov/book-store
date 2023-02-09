import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles, EnumRoles } from '@/common';

import { CategoriesService } from './categories.service';
import { CategoriesResponseDTO } from './dto';

@ApiTags('Categories')
@Controller('/categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: "get book's categories" })
  @ApiResponse({
    status: 200,
    description: "get book's categories",
    type: CategoriesResponseDTO,
  })
  async getCategories(): Promise<CategoriesResponseDTO[]> {
    return await this.categoriesService.getCategories();
  }
}
