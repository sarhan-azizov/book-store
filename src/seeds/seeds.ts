import { MigrationInterface, QueryRunner } from 'typeorm';
import { CitiesSeed, BooksSeed } from '../modules';

export class Seeds1673384735839 implements MigrationInterface {
  name = 'Seeds1673384735831';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await CitiesSeed(queryRunner);
    await BooksSeed(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.resolve();
  }
}
