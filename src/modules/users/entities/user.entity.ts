import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { CityEntity } from '../../cities';

@Entity('USER')
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'user_pkey',
  })
  id: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @Column()
  gender: number;

  @AutoMap()
  @ManyToOne(() => CityEntity, (city) => city.user, { nullable: false })
  @JoinColumn({
    name: 'cityId',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'USER_cityId_fkey',
  })
  city: CityEntity;

  @AutoMap()
  @Column()
  phone: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
