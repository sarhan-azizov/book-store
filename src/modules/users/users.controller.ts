import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';

import {
  CommonErrorResponseDTO,
  CustomBusinessException,
  CommonDeleteResponseDTO,
  EnumModules,
} from '../../common';
import { CreateUserRequestDTO, UserResponseDTO } from './dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly usersService: UsersService,
  ) {}

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
    const foundUser = await this.usersService.getUser(email);

    if (!foundUser) {
      throw new CustomBusinessException(
        'user with provided email does not exist',
        EnumModules.USER,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.mapper.map(foundUser, UserEntity, UserResponseDTO);
  }

  @Delete('/:email')
  @ApiOperation({ summary: 'delete user by email' })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Return deleted user result ',
    type: CommonDeleteResponseDTO,
  })
  async deleteUser(@Param('email') email: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(email);
  }
}
