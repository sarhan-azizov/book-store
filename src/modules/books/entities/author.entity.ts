import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { BookEntity } from './book.entity';

@Entity('AUTHOR')
export class AuthorEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => BookEntity, (book) => book.authors, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    nullable: false,
  })
  books: BookEntity[];

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
