import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { BookEntity } from '@/modules';

import { OrderEntity } from './order.entity';

@Entity({ name: 'ORDERS_BOOKS' })
export class OrdersBooksEntity {
  @PrimaryGeneratedColumn('uuid')
  orderToBookId: string;

  @Column({ type: 'money' })
  cost: string;

  @ManyToOne(() => BookEntity, (book) => book.ordersBooks)
  @JoinColumn({
    name: 'bookId',
  })
  book: BookEntity;

  @ManyToOne(() => OrderEntity, (order) => order.ordersBooks)
  @JoinColumn({
    name: 'orderId',
  })
  order: OrderEntity;
}
