import { Controller, Post, Body, Req } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectMapper } from '@automapper/nestjs';
import jwtDecode from 'jwt-decode';
import { Mapper } from '@automapper/core';
import { Request } from 'express';

import { Roles, EnumRoles } from '@/common';
import { TTokenPayload } from '@/modules/auth';

import { CreateOrderRequestDTO, CreateOrderResponseDTO } from './dto';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly ordersService: OrdersService,
  ) {}

  @Post('/')
  @Roles([EnumRoles.USER])
  @ApiOperation({ summary: 'create an order' })
  @ApiResponse({
    status: 201,
    description: 'create an order',
    type: CreateOrderResponseDTO,
  })
  async createOrder(
    @Req() request: Request,
    @Body() createOrderRequestDTO: CreateOrderRequestDTO,
  ): Promise<CreateOrderResponseDTO> {
    try {
      const token = request.headers.authorization;
      const parsedToken = jwtDecode<TTokenPayload>(String(token));

      const createdOrder = await this.ordersService.createOrder(
        createOrderRequestDTO,
        parsedToken.id,
      );

      return createdOrder;
    } catch (e) {
      throw e;
    }
  }
}
