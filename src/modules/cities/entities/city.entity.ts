import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

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

  @OneToMany(() => UserEntity, (user) => user.city)
  user: UserEntity;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
