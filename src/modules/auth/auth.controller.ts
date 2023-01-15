import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { AuthRequestDTO, AuthResponseDTO } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 200,
    description: 'Return token',
    type: AuthResponseDTO,
  })
  async authorization(
    @Body() authorizationRequestDTO: AuthRequestDTO,
  ): Promise<AuthResponseDTO> {
    return await this.authService.auth(authorizationRequestDTO);
  }
}
