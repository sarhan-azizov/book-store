import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

import { Roles, EnumRoles } from '@/common';

import { AuthRequestDTO, AuthResponseDTO } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  @Roles([EnumRoles.PUBLIC])
  @ApiOperation({ summary: 'authorize a user' })
  @ApiResponse({
    status: 200,
    description: 'Return token for authorized user',
    type: AuthResponseDTO,
  })
  async authorization(
    @Body() authorizationRequestDTO: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return await this.authService.auth(authorizationRequestDTO);
  }
}
