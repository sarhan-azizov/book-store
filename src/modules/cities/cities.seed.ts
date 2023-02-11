import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import { CityEntity } from './entities';

export const citiesSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const cities: CityEntity[] = new Array(10)
    .fill(null)
    .map(() =>
      Object.assign(new CityEntity(), { name: faker.address.cityName() }),
    );

  await queryRunner.manager.insert(
    CityEntity,
    cities.map((city) => city),
  );
};
