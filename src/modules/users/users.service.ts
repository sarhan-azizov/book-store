import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { DOTENV } from '../../configs';
import {
  EnumModules,
  CustomDatabaseException,
  CustomBusinessException,
} from '@/common';

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
          email: createUserRequestDTO.email.toLowerCase(),
          password: hashSync(password, DOTENV.salt),
        },
        CreateUserRequestDTO,
        UserEntity,
      );

      const savedUserEntity = await this.userRepository.save(userEntity);

      return this.mapper.map(savedUserEntity, UserEntity, UserResponseDTO);
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }

  async getUser(email: string): Promise<UserEntity | null> {
    try {
      return await this.userRepository.findOne({
        where: { email: String(email) },
        relations: {
          city: true,
        },
      });
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }

  async deleteUser(email: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete({
        email: String(email).toLowerCase(),
      });
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }
}
