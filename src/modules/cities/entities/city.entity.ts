import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CITY')
export class CityEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'city_pkey',
  })
  id: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
