import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import {
  LanguageEntity,
  CategoryEntity,
  AuthorEntity,
  BookEntity,
} from './entities';

export const BooksSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const languages = [
    { id: faker.datatype.uuid(), name: 'Русский' },
    { id: faker.datatype.uuid(), name: 'Английский' },
  ];
  const categories = [
    { id: faker.datatype.uuid(), name: 'Школьные учебники' },
    { id: faker.datatype.uuid(), name: 'Фэнтези' },
    { id: faker.datatype.uuid(), name: 'Фантастика' },
    { id: faker.datatype.uuid(), name: 'Детективы' },
    { id: faker.datatype.uuid(), name: 'Любовные романы' },
    { id: faker.datatype.uuid(), name: 'Психология' },
    { id: faker.datatype.uuid(), name: 'История' },
    { id: faker.datatype.uuid(), name: 'Компьютерная литература' },
  ];
  const authors = [
    {
      id: faker.datatype.uuid(),
      firstName: 'Джон',
      lastName: 'Толкин',
      description: '',
    },
    {
      id: faker.datatype.uuid(),
      firstName: 'Джейн',
      lastName: 'Остин',
      description: '',
    },
    {
      id: faker.datatype.uuid(),
      firstName: 'Филип',
      lastName: 'Пулман',
      description: '',
    },
    {
      id: faker.datatype.uuid(),
      firstName: 'Дуглас',
      lastName: 'Адамс',
      description: '',
    },
    {
      id: faker.datatype.uuid(),
      firstName: 'Джоан',
      lastName: 'Роулинг',
      description: '',
    },
  ];

  await queryRunner.manager.insert(
    CategoryEntity,
    categories.map((category) => Object.assign(new CategoryEntity(), category)),
  );

  await queryRunner.manager.insert(
    AuthorEntity,
    authors.map((author) => Object.assign(new AuthorEntity(), author)),
  );

  await queryRunner.manager.insert(
    LanguageEntity,
    languages.map((language) => Object.assign(new LanguageEntity(), language)),
  );

  const books: BookEntity[] = [
    Object.assign(new BookEntity(), {
      language: Object.assign(new LanguageEntity(), { id: languages[0].id }),
      categories: [
        Object.assign(new CategoryEntity(), {
          id: categories[0].id,
        }),
      ],
      authors: [
        Object.assign(new AuthorEntity(), {
          id: authors[0].id,
        }),
      ],
      title: 'Фантастические твари и где они обитают.',
      description:
        'Эта книга – дебют Дж.К. Роулинг в качестве сценариста. Это грандиозная приключенческая история о дружбе, волшебстве и хаосе с вереницей',
      cost: 350,
      pages: 304,
      publicationDate: new Date(),
    }),
  ];

  await queryRunner.manager.save(
    BookEntity,
    books.map((book) => book),
  );
};
