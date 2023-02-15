import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CityEntity } from '@/modules/cities';

@Entity('STORE_DEPARTMENTS')
export class StoreDepartmentsEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  address: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  cityId: string;

  @ManyToOne(() => CityEntity)
  city: CityEntity;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
