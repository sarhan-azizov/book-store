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
  })
  user: UserEntity;

  @AutoMap()
  @ManyToOne(() => StoreDepartmentsEntity, {
    nullable: false,
  })
  @JoinColumn({
    name: 'storeDepartmentId',
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
    },
    inverseJoinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
    },
  })
  books: BookEntity[];

  @AutoMap()
  @Column({ length: 20, type: 'varchar' })
  status: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
