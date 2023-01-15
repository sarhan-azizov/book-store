import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { DOTENV } from '../../configs';
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

  async createUser({
    password,
    ...createUserRequestDTO
  }: CreateUserRequestDTO): Promise<UserResponseDTO> {
    try {
      const userEntity = this.mapper.map(
        {
          ...createUserRequestDTO,
          password: hashSync(password, DOTENV.salt),
        },
        CreateUserRequestDTO,
        UserEntity,
      );

      const savedUserEntity = await this.userRepository.save(userEntity);

      return this.mapper.map(savedUserEntity, UserEntity, UserResponseDTO);
    } catch (err) {
      throw err;
    }
  }

  async getUser(email: string): Promise<UserResponseDTO> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { email: String(email) },
      });

      if (!foundUser) {
        new NotFoundException(
          'user with provided original email does not exist',
        );
      }

      return this.mapper.map(foundUser, UserEntity, UserResponseDTO);
    } catch (err) {
      throw err;
    }
  }
}
