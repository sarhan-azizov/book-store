import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { BooksService } from '@/modules/books';
import {
  CustomBusinessException,
  CustomDatabaseException,
  EnumModules,
} from '@/common';

import { OrderEntity } from './entities';
import { CreateOrderRequestDTO, CreateOrderResponseDTO } from './dto';
import { EnumOrderStatus } from './orders.type';

@Injectable()
export class OrdersService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly booksService: BooksService,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(
    createOrderRequestDTO: CreateOrderRequestDTO,
    userId: string,
  ): Promise<CreateOrderResponseDTO> {
    try {
      const books = await this.booksService.getBooksById(
        createOrderRequestDTO.books,
      );
      const booksTotalCost = books.reduce((result, book) => {
        return result + Number(book.cost.replace('$', ''));
      }, 0);

      const newOrder = this.mapper.map(
        createOrderRequestDTO,
        CreateOrderRequestDTO,
        OrderEntity,
        {
          extraArgs: () => ({
            userId,
            cost: `$${booksTotalCost}`,
            status: EnumOrderStatus.PENDING,
          }),
        },
      );

      const savedOrderEntity = await this.orderRepository.save(newOrder);

      return this.mapper.map(
        savedOrderEntity,
        OrderEntity,
        CreateOrderResponseDTO,
        {
          extraArgs: () => ({
            storeDepartment: createOrderRequestDTO.storeDepartment,
            books: createOrderRequestDTO.books,
          }),
        },
      );
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }

  async getOrderHistory(userId: string): Promise<OrderEntity[]> {
    try {
      const orderHistory = await this.orderRepository.find({
        where: {
          userId,
        },
        relations: {
          books: true,
          storeDepartment: {
            city: true,
          },
        },
      });

      return orderHistory;
    } catch (error) {
      if (error instanceof CustomBusinessException) {
        throw error;
      }

      throw new CustomDatabaseException(
        'something went wrong',
        EnumModules.USER,
        error,
      );
    }
  }
}
