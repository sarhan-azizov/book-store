import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateUserRequestDTO, UserResponseDTO } from './dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 201,
    description: 'Return user',
    type: UserResponseDTO,
  })
  async getCities(
    @Body() createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserRequestDTO> {
    return await this.usersService.createUser(createUserRequestDTO);
  }
}
