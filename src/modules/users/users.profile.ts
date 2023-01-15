import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CreateUserRequestDTO, UserResponseDTO } from './dto';
import { UserEntity } from './entities';

@Injectable()
export class UsersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateUserRequestDTO,
        UserEntity,
        forMember(
          (dest) => dest.city.id,
          mapFrom((src) => src.cityId),
        ),
      );

      createMap(
        mapper,
        UserEntity,
        UserResponseDTO,
        forMember(
          (dest) => dest.cityId,
          mapFrom((src) => src.city?.id || src.cityId),
        ),
      );
    };
  }
}
