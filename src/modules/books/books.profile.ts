import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BookResponseDTO } from './dto';
import { BookEntity } from './entities';

@Injectable()
export class BooksProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        BookEntity,
        BookResponseDTO,
        forMember(
          (dest) => dest.authors,
          mapFrom((src) => src.authors),
        ),
        forMember(
          (dest) => dest.categories,
          mapFrom((src) => src.categories),
        ),
        forMember(
          (dest) => dest.language,
          mapFrom((src) => src.language),
        ),
      );
    };
  }
}
