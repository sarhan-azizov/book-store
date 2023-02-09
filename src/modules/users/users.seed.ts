import { QueryRunner } from 'typeorm';
import { hashSync } from 'bcryptjs';

import { CityEntity } from '@/modules/cities';
import { DOTENV } from '@/configs';

import { UserEntity } from './entities';

export const usersSeed = async (queryRunner: QueryRunner): Promise<void> => {
  const foundCity = await queryRunner.manager.findOne(CityEntity, {
    where: {
      name: 'Днепр',
    },
  });

  const users: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      email: 'admin@admin.com',
      firstName: 'admin',
      lastName: 'admin',
      gender: 0,
      phone: '',
      admin: true,
      city: Object.assign(new CityEntity(), { id: foundCity?.id }),
      password: hashSync('admin', DOTENV.salt),
    },
  ];

  await queryRunner.manager.insert(
    UserEntity,
    users.map((user) => Object.assign(new UserEntity(), user)),
  );
};
