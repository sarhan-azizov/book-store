import { QueryRunner } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { CityEntity } from '@/modules/cities';
import { DOTENV } from '@/configs';

import { UserEntity } from './entities';

export const usersSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const foundCities = await queryRunner.manager.find(CityEntity);

  const users: UserEntity[] = [
    Object.assign(new UserEntity(), {
      email: 'admin@admin.com',
      firstName: 'admin',
      lastName: 'admin',
      gender: 0,
      phone: '',
      admin: true,
      city: Object.assign(new CityEntity(), { id: foundCities[0]?.id }),
      password: hashSync('admin', DOTENV.salt),
    }),
    Object.assign(new UserEntity(), {
      email: 'sarhan.azizov@gmail.com',
      firstName: 'sarhan',
      lastName: 'sarhan',
      gender: 0,
      phone: '',
      admin: false,
      city: Object.assign(new CityEntity(), { id: foundCities[1]?.id }),
      password: hashSync('sarhan', DOTENV.salt),
    }),
  ];

  await queryRunner.manager.insert(
    UserEntity,
    users.map((user) => user),
  );
};
