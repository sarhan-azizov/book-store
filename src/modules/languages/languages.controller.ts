import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles, EnumRoles } from '@/common';

import { LanguagesService } from './languages.service';
import { LanguageResponseDTO } from './dto';

@ApiTags('Languages')
@Controller('/languages')
@ApiBearerAuth()
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: "get book's languages" })
  @ApiResponse({
    status: 200,
    description: "get book's languages",
    type: LanguageResponseDTO,
  })
  async getLanguages(): Promise<LanguageResponseDTO[]> {
    return await this.languagesService.getLanguages();
  }
}
