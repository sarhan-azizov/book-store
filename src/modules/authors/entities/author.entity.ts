import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('AUTHORS')
export class AuthorEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  firstName: string;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  lastName: string;

  @AutoMap()
  @Column({ length: 1000, type: 'varchar' })
  description: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
