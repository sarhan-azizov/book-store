import {
  createMap,
  forMember,
  mapFrom,
  mapWithArguments,
  Mapper,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/users';
import { BookEntity } from '@/modules/books';

import { CreateOrderRequestDTO, CreateOrderResponseDTO } from './dto';
import { OrderEntity } from './entities';

@Injectable()
export class OrdersProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CreateOrderRequestDTO,
        OrderEntity,
        forMember(
          (destination) => destination.books,
          mapFrom(({ books }) =>
            books.map((id) => Object.assign(new BookEntity(), { id })),
          ),
        ),
        forMember(
          (dest) => dest.user,
          mapWithArguments((_source, { userId }) =>
            Object.assign(new UserEntity(), { id: userId }),
          ),
        ),
        forMember(
          (dest) => dest.status,
          mapWithArguments((_source, { status }) => status),
        ),
      );
      createMap(
        mapper,
        OrderEntity,
        CreateOrderResponseDTO,
        forMember(
          (dest) => dest.books,
          mapWithArguments((_source, { books }) => books),
        ),
        forMember(
          (dest) => dest.departmentStoreId,
          mapWithArguments((_source, { storeDepartment }) => storeDepartment),
        ),
      );
    };
  }
}
