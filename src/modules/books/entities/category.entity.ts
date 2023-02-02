import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('CATEGORY')
export class CategoryEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
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
