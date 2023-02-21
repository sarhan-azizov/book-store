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

import { LanguageEntity } from '@/modules/languages';
import { CategoryEntity } from '@/modules/categories';
import { AuthorEntity } from '@/modules/authors';

@Entity('BOOKS')
export class BookEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap(() => [CategoryEntity])
  @ManyToMany(() => CategoryEntity, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'BOOKS_CATEGORIES',
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

  @AutoMap(() => [AuthorEntity])
  @ManyToMany(() => AuthorEntity, {
    cascade: true,
    nullable: false,
  })
  @JoinTable({
    name: 'BOOKS_AUTHORS',
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

  @AutoMap()
  @ManyToOne(() => LanguageEntity, (bookLanguage) => bookLanguage.books, {
    nullable: false,
  })
  @JoinTable({
    name: 'LANGUAGES',
    joinColumn: {
      name: 'languageId',
      referencedColumnName: 'id',
    },
  })
  language: LanguageEntity;

  @AutoMap()
  @Column({ length: 120, type: 'varchar' })
  title: string;

  @AutoMap()
  @Column({ length: 60, type: 'varchar', unique: true })
  sku: string;

  @AutoMap()
  @Column({ length: 2500, type: 'varchar' })
  description: string;

  @AutoMap()
  @Column({ type: 'money' })
  cost: string;

  @AutoMap()
  @Column({ type: 'smallint' })
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
