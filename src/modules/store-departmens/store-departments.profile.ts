import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { StoreDepartmentsDTO } from './dto';
import { StoreDepartmentsEntity } from './entities';

@Injectable()
export class StoreDepartmentsProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, StoreDepartmentsEntity, StoreDepartmentsDTO);
    };
  }
}
