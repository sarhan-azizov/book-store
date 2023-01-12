import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserRequestDTO, UserResponseDTO } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    createUserRequestDTO: CreateUserRequestDTO,
  ): Promise<CreateUserRequestDTO> {
    try {
      const userEntity = this.mapper.map(
        createUserRequestDTO,
        CreateUserRequestDTO,
        UserEntity,
      );

      const savedUserEntity = await this.userRepository.save(userEntity);

      return this.mapper.map(savedUserEntity, UserEntity, UserResponseDTO);
    } catch (err) {
      throw err;
    }
  }
}
