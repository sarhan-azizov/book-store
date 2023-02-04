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

@Entity('USERS')
@Unique('USERS_email_ukey', ['email'])
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  firstName: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  lastName: string;

  @AutoMap()
  @Column({ precision: 1, type: 'decimal' })
  gender: number;

  @AutoMap()
  @Column({ length: 60, type: 'varchar' })
  password: string;

  @AutoMap()
  @Column({ type: 'uuid' })
  cityId: string;

  @AutoMap()
  @ManyToOne(() => CityEntity, (city) => city.user, { nullable: false })
  @JoinColumn()
  city: CityEntity;

  @AutoMap()
  @Column({ length: 15, type: 'varchar' })
  phone: string;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  email: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
