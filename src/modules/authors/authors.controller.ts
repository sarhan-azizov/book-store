import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles, EnumRoles } from '@/common';

import { AuthorsService } from './authors.service';
import { AuthorsResponseDTO } from './dto';

@ApiTags('Authors')
@Controller('/authors')
@ApiBearerAuth()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: "get book's authors" })
  @ApiResponse({
    status: 200,
    description: "get book's authors",
    type: AuthorsResponseDTO,
  })
  async getAuthors(): Promise<AuthorsResponseDTO[]> {
    return await this.authorsService.getAuthors();
  }
}
