import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { BookEntity, StoreDepartmentsEntity, UserEntity } from '@/modules';

@Entity('ORDERS')
export class OrderEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  userId: string;

  @AutoMap()
  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'userId',
    foreignKeyConstraintName: 'ORDERS_userId_fkey',
  })
  user: UserEntity;

  @AutoMap()
  @ManyToOne(() => StoreDepartmentsEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'storeDepartmentId',
    foreignKeyConstraintName: 'ORDERS_storeDepartmentId_fkey',
  })
  storeDepartment: StoreDepartmentsEntity;

  @AutoMap(() => [BookEntity])
  @ManyToMany(() => BookEntity, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'BOOKS_ORDERS',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOKS_ORDERS_orderId_fkey',
    },
    inverseJoinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOKS_ORDERS_bookId_fkey',
    },
  })
  books: BookEntity[];

  @AutoMap()
  @Column({ length: 20, type: 'varchar' })
  status: string;

  @AutoMap()
  @Column({ type: 'money' })
  cost: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
