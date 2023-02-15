import { QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

import { StoreDepartmentsEntity } from './entities/store-departments.entity';
import { CityEntity } from '@/modules/cities';

export const storeDepartmentsSeed = async (
  queryRunner: QueryRunner,
): Promise<void> => {
  const cities: CityEntity[] = await queryRunner.manager.find(CityEntity);

  const storeDepartments: StoreDepartmentsEntity[] = new Array(10)
    .fill(null)
    .map(() =>
      Object.assign(new StoreDepartmentsEntity(), {
        address: faker.address.streetAddress(),
        city: cities[faker.datatype.number({ min: 0, max: 9 })],
      }),
    );

  await queryRunner.manager.insert(
    StoreDepartmentsEntity,
    storeDepartments.map((storeDepartment) => storeDepartment),
  );
};
