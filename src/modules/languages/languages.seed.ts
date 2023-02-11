import { QueryRunner } from 'typeorm';

import { LanguageEntity } from './entities';

export const languagesSeed = async (
  queryRunner: QueryRunner,
): Promise<void> => {
  const languages: LanguageEntity[] = [
    Object.assign(new LanguageEntity(), { name: 'Russian' }),
    Object.assign(new LanguageEntity(), { name: 'English' }),
  ];

  await queryRunner.manager.insert(
    LanguageEntity,
    languages.map((language) => language),
  );
};
