import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import { CategoryEntity } from './entities';

export const categoriesSeed = async (
  queryRunner: QueryRunner,
): Promise<void> => {
  const categories: CategoryEntity[] = new Array(10).fill(null).map(() =>
    Object.assign(new CategoryEntity(), {
      name: faker.company.companyName(),
    }),
  );

  await queryRunner.manager.insert(
    CategoryEntity,
    categories.map((category) => category),
  );
};
