import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

import { CommonErrorResponseDTO } from '../../common';
import { CreateUserRequestDTO, UserResponseDTO } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @ApiOperation({ summary: 'create user' })
  @ApiResponse({
    status: 201,
    description: 'Return user',
    type: UserResponseDTO,
  })
  async createUser(
    @Body() createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<UserResponseDTO> {
    return await this.usersService.createUser(createUserRequestDTO);
  }

  @Get('/:email')
  @ApiOperation({ summary: 'find user by email' })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a user',
    type: UserResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'User with provided original email does not exist',
    type: CommonErrorResponseDTO,
  })
  async getUser(@Param('email') email: string): Promise<UserResponseDTO> {
    return await this.usersService.getUser(email);
  }
}
