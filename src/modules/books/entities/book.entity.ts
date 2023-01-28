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

import { AuthorEntity } from './author.entity';
import { BookCategoryEntity } from './book-category.entity';
import { LanguageEntity } from './language.entity';

@Entity('BOOK')
export class BookEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => AuthorEntity, (author) => author.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'BOOK_AUTHOR',
    joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOK_AUTHOR_bookId_fkey',
    },
    inverseJoinColumn: {
      name: 'authorId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOK_AUTHOR_authorId_fkey',
    },
  })
  authors: AuthorEntity[];

  @ManyToOne(() => BookCategoryEntity, (bookCategory) => bookCategory.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'BOOK_CATEGORY',
    joinColumn: {
      name: 'bookId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOK_CATEGORY_bookId_fkey',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'BOOK_CATEGORY_categoryId_fkey',
    },
  })
  categories: BookCategoryEntity[];

  @ManyToOne(() => LanguageEntity, (bookLanguage) => bookLanguage.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
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
