import { QueryRunner } from 'typeorm';

import { CityEntity } from './entities';

export const CitiesSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const cities = [
    { name: 'Киев' },
    { name: 'Днепропетровск' },
    { name: 'Харьков' },
    { name: 'Донецк' },
  ];
  await queryRunner.manager.insert(
    CityEntity,
    cities.map((city) => Object.assign(new CityEntity(), city)),
  );
};
