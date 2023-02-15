import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(
    createOrderRequestDTO: CreateOrderRequestDTO,
    userId: string,
  ): Promise<CreateOrderResponseDTO> {
    try {
      const newOrder = this.mapper.map(
        createOrderRequestDTO,
        CreateOrderRequestDTO,
        OrderEntity,
        {
          extraArgs: () => ({
            userId,
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
}
