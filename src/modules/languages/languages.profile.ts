import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LanguageResponseDTO } from './dto';
import { LanguageEntity } from './entities';

@Injectable()
export class LanguagesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, LanguageEntity, LanguageResponseDTO);
    };
  }
}
