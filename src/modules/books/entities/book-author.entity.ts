import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BookEntity } from './book.entity';
import { AuthorEntity } from './author.entity';

@Entity('BOOK_AUTHOR')
export class BookAuthorEntity {
  @PrimaryColumn()
  bookId: string;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => BookEntity, (book) => book.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'bookId', referencedColumnName: 'id' }])
  books: BookEntity[];

  @ManyToOne(() => AuthorEntity, (author) => author.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  authors: AuthorEntity[];
}
