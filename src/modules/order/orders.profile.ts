import {
  createMap,
  forMember,
  mapFrom,
  mapWithArguments,
  Mapper,
  mapWith,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/users';
import { BookEntity, BookResponseDTO } from '@/modules/books';

import {
  CreateOrderRequestDTO,
  CreateOrderResponseDTO,
  OrderResponseDTO,
} from './dto';
import { OrderEntity, OrdersBooksEntity } from './entities';

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
          (destination) => destination.ordersBooks,
          mapWithArguments((source, { books }: { books: BookEntity[] }) =>
            source.books.map((id) =>
              Object.assign(new OrdersBooksEntity(), {
                book: Object.assign(new BookEntity(), { id }),
                cost: (books || []).find((book) => book.id === id)?.cost,
              }),
            ),
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
        forMember(
          (dest) => dest.cost,
          mapWithArguments((_source, { cost }) => cost),
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
      createMap(
        mapper,
        OrderEntity,
        OrderResponseDTO,
        forMember(
          (destination) => destination.departmentStore,
          mapFrom((source) => source.storeDepartment),
        ),
        forMember(
          (destination) => destination.books,
          mapWith(BookResponseDTO, BookEntity, (source) =>
            source.ordersBooks.map((ordersBook) => ordersBook.book),
          ),
        ),
      );
    };
  }
}
