import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { AuthorEntity } from './entities';
import { AuthorsResponseDTO } from './dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) {}

  async getAuthors(): Promise<AuthorsResponseDTO[]> {
    try {
      const authors = await this.authorsRepository.find();

      return this.mapper.mapArray(authors, AuthorEntity, AuthorsResponseDTO);
    } catch (err) {
      throw err;
    }
  }
}
