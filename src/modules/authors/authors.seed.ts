import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import { AuthorEntity } from '@/modules/authors';

export const authorsSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const authors: AuthorEntity[] = new Array(10).fill(null).map(() =>
    Object.assign(new AuthorEntity(), {
      firstName: faker.name.findName(),
      lastName: faker.name.lastName(),
      description: faker.random.words(100),
    }),
  );

  await queryRunner.manager.insert(
    AuthorEntity,
    authors.map((author) => author),
  );
};
