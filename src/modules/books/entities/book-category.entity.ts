import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './book.entity';
import { AuthorEntity } from './author.entity';

@Entity('BOOK_CATEGORY')
export class StudentCourse {
  @PrimaryColumn()
  bookId: number;

  @PrimaryColumn()
  authorId: number;

  @ManyToOne(() => BookEntity, (book) => book.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  books: BookEntity[];

  @ManyToOne(() => AuthorEntity, (author) => author.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  authors: AuthorEntity[];
}
