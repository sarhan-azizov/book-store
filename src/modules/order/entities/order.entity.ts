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
  OneToMany,
} from 'typeorm';

import {
  OrdersBooksEntity,
  StoreDepartmentsEntity,
  UserEntity,
} from '@/modules';

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

  @AutoMap(() => [OrdersBooksEntity])
  @OneToMany(
    () => OrdersBooksEntity,
    (ordersBooksEntity) => ordersBooksEntity.order,
    { cascade: true },
  )
  ordersBooks: OrdersBooksEntity[];

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
