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
} from 'typeorm';

import { LanguageEntity } from './language.entity';
import { CategoryEntity } from './category.entity';
import { AuthorEntity } from './author.entity';

@Entity('BOOK')
export class BookEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => CategoryEntity, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'BOOK_CATEGORY',
    joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];

  @ManyToMany(() => AuthorEntity, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'BOOK_AUTHOR',
    joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'authorId',
      referencedColumnName: 'id',
    },
  })
  authors: AuthorEntity[];

  @ManyToOne(() => LanguageEntity, (bookLanguage) => bookLanguage.books, {
    nullable: false,
  })
  @JoinTable({
    name: 'BOOK_LANGUAGE',
    joinColumn: {
      name: 'languageId',
      referencedColumnName: 'id',
    },
  })
  language: LanguageEntity;

  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  cost: number;

  @AutoMap()
  @Column()
  pages: number;

  @AutoMap()
  @Column()
  publicationDate: Date;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;
}
