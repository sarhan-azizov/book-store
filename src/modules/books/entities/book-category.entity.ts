import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './book.entity';
import { CategoryEntity } from './category.entity';

@Entity('BOOK_CATEGORY')
export class BookCategoryEntity {
  @PrimaryColumn()
  bookId: string;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => BookEntity, (book) => book.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([
    {
      name: 'bookId',
      referencedColumnName: 'id',
    },
  ])
  books: BookEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  categories: CategoryEntity[];
}
