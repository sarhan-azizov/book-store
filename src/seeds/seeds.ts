import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  usersSeed,
  citiesSeed,
  booksSeed,
  languagesSeed,
  categoriesSeed,
  authorsSeed,
} from '../modules';

export class Seeds1673384735839 implements MigrationInterface {
  name = 'Seeds16733847358313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await citiesSeed(queryRunner);
    await languagesSeed(queryRunner);
    await categoriesSeed(queryRunner);
    await authorsSeed(queryRunner);
    await usersSeed(queryRunner);
    await booksSeed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve();
  }
}
