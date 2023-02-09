import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

import { LanguageEntity } from './entities';
import { LanguageResponseDTO } from './dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    @InjectRepository(LanguageEntity)
    private languageRepository: Repository<LanguageEntity>,
  ) {}

  async getLanguages(): Promise<LanguageResponseDTO[]> {
    try {
      const languages = await this.languageRepository.find();

      return this.mapper.mapArray(
        languages,
        LanguageEntity,
        LanguageResponseDTO,
      );
    } catch (err) {
      throw err;
    }
  }
}
