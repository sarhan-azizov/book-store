import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AuthorsResponseDTO } from './dto';
import { AuthorEntity } from './entities';

@Injectable()
export class AuthorsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, AuthorEntity, AuthorsResponseDTO);
    };
  }
}
