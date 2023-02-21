import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService, BookEntity } from '@/modules/books';

import { OrdersProfile } from './orders.profile';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, BookEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, BooksService, OrdersProfile],
  exports: [],
})
export class OrdersModule {}
