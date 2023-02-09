import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CommonDeleteResponseDTO,
  CommonErrorResponseDTO,
  CustomBusinessException,
  EnumModules,
  EnumRoles,
  Roles,
} from '@/common';

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
  @Roles([EnumRoles.PUBLIC])
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
  @ApiBearerAuth()
  @Roles([EnumRoles.ADMIN])
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
    try {
      const foundUser = await this.usersService.getUser(email);

      if (!foundUser) {
        throw new CustomBusinessException(
          'user with provided email does not exist',
          EnumModules.USER,
          HttpStatus.NOT_FOUND,
        );
      }

      return this.mapper.map(foundUser, UserEntity, UserResponseDTO);
    } catch (e) {
      throw e;
    }
  }

  @Get('/')
  @ApiBearerAuth()
  @Roles([EnumRoles.ADMIN])
  @ApiOperation({ summary: 'get users' })
  @ApiResponse({
    status: 200,
    description: 'Return users',
    type: UserResponseDTO,
  })
  async getUsers(): Promise<UserResponseDTO[]> {
    try {
      const foundUsers = await this.usersService.getUsers();

      return this.mapper.mapArray(foundUsers, UserEntity, UserResponseDTO);
    } catch (e) {
      throw e;
    }
  }

  @Delete('/:email')
  @ApiBearerAuth()
  @Roles([EnumRoles.ADMIN])
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
