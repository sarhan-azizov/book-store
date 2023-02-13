import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import { LanguageEntity } from '@/modules/languages';
import { CategoryEntity } from '@/modules/categories';
import { AuthorEntity } from '@/modules/authors';

import { BookEntity } from './entities';

export const booksSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const languages: LanguageEntity[] = await queryRunner.manager.find(
    LanguageEntity,
  );
  const categories: CategoryEntity[] = await queryRunner.manager.find(
    CategoryEntity,
  );
  const authors: AuthorEntity[] = await queryRunner.manager.find(AuthorEntity);

  const books: BookEntity[] = new Array(20).fill(null).map((item, idx) =>
    Object.assign(new BookEntity(), {
      language: { id: languages[faker.datatype.number({ min: 0, max: 1 })].id },
      categories: [
        { id: categories[faker.datatype.number({ min: 0, max: 9 })].id },
      ],
      authors: [{ id: authors[faker.datatype.number({ min: 0, max: 9 })].id }],
      title: faker.random.words(),
      description: faker.random.words(100),
      cost: faker.commerce.price(5, 1000, ),
      pages: faker.datatype.number({ min: 30, max: 3000 }),
      sku: `sku-${idx}`,
      publicationDate: faker.date.between(
        '2000-01-01T00:00:00.000Z',
        '2022-01-01T00:00:00.000Z',
      ),
    }),
  );

  await queryRunner.manager.save(
    BookEntity,
    books.map((book) => book),
  );
};
