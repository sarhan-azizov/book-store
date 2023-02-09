import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CategoriesResponseDTO } from './dto';
import { CategoryEntity } from './entities';

@Injectable()
export class CategoriesProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CategoryEntity, CategoriesResponseDTO);
    };
  }
}
