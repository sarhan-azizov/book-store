import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

import { CityEntity } from '../../cities';

@Entity('USER')
@Unique('USER_email_key', ['email'])
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
  @Column()
  password: string;

  @AutoMap()
  @Column()
  cityId: string;

  @AutoMap()
  @ManyToOne(() => CityEntity, (city) => city.user, { nullable: false })
  @JoinColumn()
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
