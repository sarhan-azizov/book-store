import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles, EnumRoles } from '@/common';

import { StoreDepartmentsService } from './store-departments.service';
import { StoreDepartmentsDTO } from './dto';

@ApiTags('Store departments')
@Controller('/store-departments')
@ApiBearerAuth()
export class StoreDepartmentsController {
  constructor(
    private readonly storeDepartmentsService: StoreDepartmentsService,
  ) {}

  @Get('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: "get store's departments" })
  @ApiResponse({
    status: 200,
    description: "get store's departments",
    type: StoreDepartmentsDTO,
  })
  async getAuthors(): Promise<StoreDepartmentsDTO[]> {
    return await this.storeDepartmentsService.getStoreDepartments();
  }
}
